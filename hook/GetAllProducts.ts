import { WriteStream } from "node:fs";
import { AggregationsEnum, PartEnum, StoreTypes } from "../types";
import cloudscraper from "cloudscraper";
import {
  getOneProductConfig,
  getProductSearchConfig,
  getStockCodeList,
} from "../api";
import { DebugToFile } from "../utils/debug";
import { ProductSearchConfigTypes } from "../types/productSearchConfig";
import GetAggregations from "./GetAggregations";
import { AGGREGATIONS_TARGET, MAX_RETRIES } from "../config";
import GetProductsList from "./GetStockCodeList";
import { Scrap } from "./Scrap";
import { DataFinal } from "../storage";
import Papa from "papaparse";

export async function GetAllProducts(
  store?: StoreTypes,
  stream?: WriteStream,
  writeStreamInfo?: WriteStream,
  part?: PartEnum
) {
  try {
    const data = await GetAggregations();
    const aggResultList = data.Aggregations.find(
      (agg) => agg.Name === AGGREGATIONS_TARGET
    ).Results;

    aggResultList.sort((a, b) => a.Count - b.Count);

    let headersWritten = false;

    let debugRoundBand = 0;
    for (const agg of aggResultList) {
      debugRoundBand++;
      console.log(`${debugRoundBand}/${aggResultList.length}`);

      const productsList = await GetProductsList(agg, writeStreamInfo);

      for (const products of productsList) {
        const items = await Scrap(store, products);

        const csvOptions = { header: !headersWritten };
        const csv = Papa.unparse(items, csvOptions);
        stream.write(csv + "\n");

        if (!headersWritten) headersWritten = true;
      }
    }
  } catch (error) {
    console.error("Error in GetAllProducts:", error);
  }
}
