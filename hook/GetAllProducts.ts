import { WriteStream } from "node:fs";
import { StoreTypes } from "../types";
import GetAggregations from "./GetAggregations";
import { AGGREGATIONS_TARGET, CONCURRENCY_LIMIT } from "../config";
import GetProductsList from "./GetStockCodeList";
import { Scrap } from "./Scrap";
import Papa from "papaparse";
import { display, workers_monitor } from "../display";

export async function GetAllProducts(
  store?: StoreTypes,
  stream?: WriteStream,
  writeStreamInfo?: WriteStream
) {
  try {
    const data = await GetAggregations();
    display[3] = `Prepare Band Lists`;
    const aggResultList = data.Aggregations.find(
      (agg) => agg.Name === AGGREGATIONS_TARGET
    ).Results;
    display[5] = aggResultList.length;

    let headersWritten = false;

    display[3] = `Prepare Workers`;
    const workers = Array.from(
      { length: CONCURRENCY_LIMIT },
      async (_, Worker_Index) => {
        workers_monitor[Worker_Index] = "Start";

        while (true) {
          if (aggResultList.length > 0) {
            let agg = aggResultList.pop();
            display[4] = display[5] - aggResultList.length;
            workers_monitor[
              Worker_Index
            ] = `Get Product List Brand : ${agg.Name}`;
            const productsList = await GetProductsList(
              agg,
              Worker_Index
            );

            for (const products of productsList) {
              workers_monitor[
                Worker_Index
              ] = `Scrap Products : ${products.Products[0].Stockcode}`;
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
      }
    );

    display[3] = `Workers Start Work`;
    await Promise.all(workers);
  } catch (error) {
    console.error("Error in GetAllProducts:", error);
  }
}
