import cloudscraper from "cloudscraper";
import {
  AggregationResult,
  Product,
  ProductSearchConfigTypes,
} from "../types/productSearchConfig";
import { getStockCodeList } from "../api";
import { MAX_RETRIES, PAGE_SIZE } from "../config";

export default async function GetProductsList(aggResult: AggregationResult) {
  const ProductList: Product[] = [];
  const loop =
    aggResult.Count % PAGE_SIZE === 0
      ? Number((aggResult.Count / PAGE_SIZE).toFixed(0))
      : Number((aggResult.Count / PAGE_SIZE).toFixed(0)) + 1;

  const fetchPageData = async (index: number) => {
    let res;
    let retries = 0;

    while (retries <= MAX_RETRIES) {
      try {
        res = await cloudscraper(getStockCodeList(aggResult, index));
        const list = JSON.parse(res) as ProductSearchConfigTypes;
        console.log(index, "Add");
        list.Products.forEach((a) => {
          ProductList.push(a);
        });

        return `Done ${aggResult.Term}`;
      } catch (error) {
        console.error(
          `Error fetching data for page ${index} Brand : ${aggResult.Term}`
        );
        retries++;

        if (retries > MAX_RETRIES) {
          console.error(
            `Max retries reached for page ${index} page ${index} Brand : ${aggResult.Term}. Skipping.`
          );
          return "Failed";
        }

        console.log(`Retrying page ${index}... (${retries}/${MAX_RETRIES})`);
      }
    }
  };

  const promises = Array.from({ length: loop }, (_, index) =>
    fetchPageData(index + 1)
  );

  await Promise.all(promises);

  return ProductList;
}
