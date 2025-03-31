import { WriteStream } from "node:fs";
import { StoreTypes } from "../types";
import GetAggregations from "./GetAggregations";
import { AGGREGATIONS_TARGET, CONCURRENCY_LIMIT } from "../config";
import GetProductsList from "./GetStockCodeList";
import { Scrap } from "./Scrap";
import Papa from "papaparse";

export async function GetAllProducts(
  store?: StoreTypes,
  stream?: WriteStream,
  writeStreamInfo?: WriteStream
) {
  try {
    const data = await GetAggregations();
    const aggResultList = data.Aggregations.find(
      (agg) => agg.Name === AGGREGATIONS_TARGET
    ).Results;

    let headersWritten = false;
    const workers = Array.from({ length: CONCURRENCY_LIMIT }, async () => {
      while (true) {
        if (aggResultList.length > 0) {
          const productsList = await GetProductsList(
            aggResultList.pop(),
            writeStreamInfo
          );

          for (const products of productsList) {
            const items = await Scrap(store, products);

            const csvOptions = { header: !headersWritten };
            const csv = Papa.unparse(items, csvOptions);
            stream.write(csv + "\n");

            if (!headersWritten) headersWritten = true;
          }
        } else {
          break;
        }
      }
    });
    await Promise.all(workers);
    
  } catch (error) {
    console.error("Error in GetAllProducts:", error);
  }
}
