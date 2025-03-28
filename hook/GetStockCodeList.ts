import cloudscraper from "cloudscraper";
import {
  AggregationResult,
  Product,
  ProductSearchConfigTypes,
} from "../types/productSearchConfig";
import { getStockCodeList } from "../api";
import { MAX_RETRIES, PAGE_SIZE, CONCURRENCY_LIMIT } from "../config";
import { DebugToFile } from "../utils/debug";
import { after } from "node:test";
import { WriteStream } from "node:fs";
import { delay } from "../utils/general";

export default async function GetProductsList(
  aggResult: AggregationResult,
  writeStreamInfo?: WriteStream
) {
  const loop =
    aggResult.Count % PAGE_SIZE === 0
      ? Number((aggResult.Count / PAGE_SIZE).toFixed(0))
      : Number((aggResult.Count / PAGE_SIZE).toFixed(0)) + 1;

  const fetchPageData = async (isTerm: boolean = false) => {
    const ProductList: Product[] = [];
    for (let i = 1; i <= loop; i++) {
      let res;
      let retries = 0;

      while (retries <= MAX_RETRIES) {
        try {
          delay(150)
          res = await cloudscraper(getStockCodeList(aggResult, i, isTerm));
          const list = JSON.parse(res) as ProductSearchConfigTypes;
          if (list?.Products.length === 0) {
            break;
          }
          list?.Products?.forEach((a) => {
            ProductList?.push(a);
          });
          console.log(
            isTerm ? "Term :" : "URL :",
            i,
            "Add All this Brand Items form",
            ProductList.length,
            "/",
            aggResult.Count,
            " index : ",
            i,
            "/",
            loop
          );
          break;
        } catch (error) {
          retries++;

          if (retries > MAX_RETRIES) {
            console.error(
              `Max retries reached for page ${i} Brand : ${aggResult.UrlFriendlyTerm}. Skipping.`
            );
            break;
          }

          // console.log(
          //   `Retrying page ${i}... (${retries}/${MAX_RETRIES}) Brand :  ${aggResult.UrlFriendlyTerm}`
          // );
        }
      }
    }
    return ProductList;
  };
  const [ProductsWithUrl, ProductsWithTerm] = await Promise.all([
    fetchPageData(false),
    fetchPageData(true),
  ]);

  //
  const combinedProducts: Product[] = [...ProductsWithUrl, ...ProductsWithTerm];

  const uniqueProducts = Array.from(
    new Map(
      combinedProducts.map((product) => [
        product?.Products[0].Stockcode,
        product,
      ])
    ).values()
  );

  console.log(
    "Before Combine:",
    ProductsWithUrl.length,
    ":",
    ProductsWithTerm.length
  );
  console.log("After Combine:", uniqueProducts.length);

  // คำนวณเปอร์เซ็นต์
  const combinedPercentage = (
    (uniqueProducts.length / aggResult.Count) *
    100
  ).toFixed(2);
  const missingCount = aggResult.Count - uniqueProducts.length;
  const missingPercentage = ((missingCount / aggResult.Count) * 100).toFixed(2);

  // จัดรูปแบบแต่ละฟิลด์ให้มีความกว้างคงที่
  const brand = aggResult.UrlFriendlyTerm.padEnd(20);
  const urlCount = ProductsWithUrl.length.toString().padStart(5);
  const termCount = ProductsWithTerm.length.toString().padStart(5);
  const combinedCount = `${uniqueProducts.length}/${aggResult.Count}`.padStart(
    12
  );
  const combinedPct = combinedPercentage.toString().padStart(6);
  const missingCnt = missingCount.toString().padStart(5);
  const missingPct = missingPercentage.toString().padStart(6);

  // เขียน log ใน 1 แถว
  writeStreamInfo.write(
    `Brand: ${brand} | URL: ${urlCount} | Term: ${termCount} | Combined: ${combinedCount} (${combinedPct}%) | Missing: ${missingCnt} (${missingPct}%)\n`
  );
  return uniqueProducts;
}
