import { WriteStream } from "node:fs";
import { AggregationsEnum, PartEnum, StoreTypes } from "../types";
import cloudscraper from "cloudscraper";
import {
  getOneProductConfig,
  getProductSearchConfig,
  getStockCodeList,
} from "../api";
import { DebugToFile } from "../utils/debug";
import {
  AggregationResult,
  ProductSearchConfigTypes,
} from "../types/productSearchConfig";
import GetAggregations from "./GetAggregations";
import { AGGREGATIONS_TARGET, MAX_RETRIES } from "../config";
import GetProductsList from "./GetStockCodeList";
import { Scrap } from "./Scrap";
import { DataFinal } from "../storage";
import Papa from "papaparse";

export async function GetAllProducts(
  store?: StoreTypes,
  stream?: WriteStream,
  part?: PartEnum
) {
  try {
    const data = await GetAggregations();
    const aggResultList = data.Aggregations.find(
      (agg) => agg.Name === AGGREGATIONS_TARGET
    ).Results;

    let headersWritten = false;

    const LoadAgg = async (agg: AggregationResult) => {
      const productsList = await GetProductsList(agg);

      for (const products of productsList) {
        const items = await Scrap(store, products);

        const csvOptions = { header: !headersWritten };
        const csv = Papa.unparse(items, csvOptions);
        stream.write(csv + "\n");

        if (!headersWritten) headersWritten = true;
      }
      return "Agg Done";
    };

    const promises = aggResultList.map((agg) => {
      return LoadAgg(agg);
    });

    do {
      const x = await promises.pop();
      console.log(x);
    } while (promises.length <= 0);
  } catch (error) {
    console.error("Error in GetAllProducts:", error);
  }
}
