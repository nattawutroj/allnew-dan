import { WriteStream } from "node:fs";
import { AggregationsEnum, PartEnum, StoreTypes } from "../types";
import {} from "../types/";
import cloudscraper from "cloudscraper";
import { getProductSearchConfig, getStockCodeList } from "../api";
import { DebugToFile } from "../utils/debug";
import { ProductSearchConfigTypes } from "../types/productSearchConfig";
import GetAggregations from "./GetAggregations";
import { AGGREGATIONS_TARGET } from "../config";

var RRRetry = 0;

export async function GetAllProducts(
  store?: StoreTypes,
  stream?: WriteStream,
  part?: PartEnum
) {
  const data = await GetAggregations();

  const aggResultList = data.Aggregations.find(
    (agg) => agg.Name === AGGREGATIONS_TARGET
  ).Results;

  console.log(aggResultList[0].Count);
  

  var res;
  RRRetry = 0;
  while (true) {
    try {
      res = await cloudscraper(getStockCodeList(aggResultList[0]));
      break;
    } catch {
      console.log("retry >>>> GetAggregations " + ` ${RRRetry}`);
      if (RRRetry > 499) {
        break;
      }
    }
  }

  DebugToFile(res);

  // ==================

  //   const brands = data.Aggregations.find((agg) => agg.Name == "brand").Results;
  //   let totalBrandCount = 0;
  //   brands.forEach((brand) => (totalBrandCount += brand.Count));
  //   const totalItems = data.SearchResultsCount;
  //   const groupedBrand = getGroupedBrand(brands);
  //   DisTotalBrandCount = totalBrandCount;
  //   DisStoreName = store.name;
  //   DisTotalProduct = totalItems;
  //   DisTotalGroup = groupedBrand.length;
  //   let allStoreProductsCode = new Set([]);
  //   for (const group of groupedBrand) {
  //     //for loop grouped brand
  //     DisNowGroup++;
  //     let res;
  //     RRRretry = 0;
  //     while (true) {
  //       try {
  //         DisNowProcess = "Hook Group = Get Group Config";
  //         if (part === "URLTerm") {
  //           res = await cloudscraper(getProductByBrandConfig(group));
  //         } else {
  //           res = await cloudscraper(getProductByBrandConfigTerm(group));
  //         }
  //         break;
  //       } catch {
  //         RRRretry++;
  //         if (RRRretry > 499) {
  //           errorStream.write(
  //             `${part}|Get Group Config ${DisNowGroup - 1} ||  ${JSON.stringify(
  //               group
  //             )} \n`
  //           );
  //           break;
  //         }
  //         DisNowProcess = "Retry >>>> Get Brand Group Config" + ` ${RRRretry}`;
  //       }
  //     }
  //     try {
  //       const data = JSON.parse(res);
  //       const items = data?.Products ?? []; // change to Items for list api
  //       const totalItems = data.SearchResultsCount; //change to TotalRecordCount for  list api
  //       const totalPage = Math.ceil(totalItems / PAGE_SIZE);
  //       items.map((item) => allStoreProductsCode.add(item.Products[0].Stockcode));
  //       DisHookProduct = allStoreProductsCode.size;
  //       //pagination fetch
  //       for (let currentPage = 2; currentPage <= totalPage; currentPage++) {
  //         try {
  //           DisNowProcess = "Hook Product From Band = start page:" + currentPage;
  //           let res;
  //           RRRretry = 0;
  //           while (true) {
  //             try {
  //               requestCount++;
  //               if (part === "URLTerm") {
  //                 res = await cloudscraper(
  //                   getProductByBrandConfig(group, currentPage)
  //                 );
  //               } else {
  //                 res = await cloudscraper(
  //                   getProductByBrandConfigTerm(group, currentPage)
  //                 );
  //               }
  //               break;
  //             } catch {
  //               RRRretry++;
  //               if (RRRretry > 499) {
  //                 errorStream.write(
  //                   `${part}|Get Product By Band ||  ${JSON.stringify(
  //                     group
  //                   )} || ${JSON.stringify(currentPage)} \n`
  //                 );
  //                 break;
  //               }
  //               DisNowProcess =
  //                 `retry >>>>> Get Product By Band Page ${currentPage}` +
  //                 ` ${RRRretry}`;
  //             }
  //           }
  //           const data = JSON.parse(res);
  //           const items = data.Products; // change to Items for list api
  //           items.map((item) =>
  //             allStoreProductsCode.add(item.Products[0].Stockcode)
  //           );
  //           DisHookProduct = allStoreProductsCode.size;
  //         } catch (e) {
  //           console.log("Error: getProductByBrandConfig :", e);
  //         }
  //       }
  //     } catch {
  //       errorStream.write(`${part}|Catch || ${JSON.stringify(group)} \n`);
  //     }
  //   }
  //   let headersWritten = false;
  //   for (const productCode of allStoreProductsCode) {
  //     try {
  //       let product;
  //       RRRretry = 0;
  //       DisNowProcess = "Hook Detail = Get One Product " + productCode;
  //       while (true) {
  //         try {
  //           product = await getOneProduct(productCode);
  //           break;
  //         } catch {
  //           DisNowProcess =
  //             `retry >>>>> Get One Product  ${productCode}` + ` ${RRRretry}`;
  //           RRRretry++;
  //           if (RRRretry > 499) {
  //             errorStream.write(
  //               `${part}|Get One Product ||  ${JSON.stringify(productCode)} \n`
  //             );
  //             break;
  //           }
  //         }
  //       }
  //       let items;
  //       while (true) {
  //         try {
  //           items = await scrapData(store, product);
  //           break;
  //         } catch {
  //           console.log(product);
  //           errorStream.write(
  //             `${part}|ScrapData || ${JSON.stringify(store)} ||` +
  //               JSON.stringify(product) +
  //               "\n"
  //           );
  //           break;
  //         }
  //       }
  //       const csvOptions = { header: !headersWritten };
  //       const csv = Papa.unparse(items, csvOptions);
  //       stream.write(csv + "\n");
  //       DisHookDetail++;
  //       if (!headersWritten) headersWritten = true;
  //       variantCount += items.length;
  //     } catch (e) {
  //       console.log("Error: const productCode of allStoreProductsCode :", e);
  //     }
  //   }
  //   stream.end();
  //   variantCount = 0;
}
