import cloudscraper from "cloudscraper";
import {
  AggregationResult,
  Product,
  ProductSearchConfigTypes,
} from "../types/productSearchConfig";
import { getStockCodeList } from "../api";
import { DELAY, MAX_RETRIES, PAGE_SIZE } from "../config";
import { display, workers_monitor } from "../display";
import { delay } from "../utils/general";

export default async function GetProductsList(
  aggResult: AggregationResult,
  Worker_Index?: number
) {
  var loop =
    aggResult.Count % PAGE_SIZE === 0
      ? Number((aggResult.Count / PAGE_SIZE).toFixed(0))
      : Number((aggResult.Count / PAGE_SIZE).toFixed(0)) + 1;

  const fetchPageData = async (isTerm: boolean = false) => {
    const ProductList: Product[] = [];
    for (let i = 1; i <= loop; i++) {
      let res;
      let retries = 0;
      let ThisProductCount = 0;

      while (retries <= MAX_RETRIES) {
        try {
          res = await cloudscraper(getStockCodeList(aggResult, i, isTerm));
          const list = JSON.parse(res) as ProductSearchConfigTypes;
          if (list?.Products.length > 0) {
            list?.Products?.forEach((a) => {
              ProductList?.push(a);
            });
          }
          ThisProductCount = list?.Products.length;
          if (list?.Products.length === 0) {
            break;
          }

          workers_monitor[Worker_Index] =
            `${isTerm ? "Term:" : "URL:"} Page ${i} - ` +
            `Added ${ProductList.length} / ${aggResult.Count} items for brand '${aggResult.UrlFriendlyTerm}' ` +
            `(Index: ${i}/${loop})`;

          break;
        } catch (error) {
          retries++;

          workers_monitor[Worker_Index] =
            `${isTerm ? "Term:" : "URL:"} Page ${i} - ` +
            `Retries reached for brand '${aggResult.UrlFriendlyTerm}' ` +
            `(attempt ${retries}/${MAX_RETRIES}), Index: ${i}/${loop}`;

          if (retries > MAX_RETRIES) {
            workers_monitor[
              Worker_Index
            ] = `Max retries reached for page ${i} Brand: ${aggResult.UrlFriendlyTerm}. Skipping.`;
            break;
          }
          await delay(DELAY);
        }
      }
      if (i + 1 <= loop === false && ThisProductCount === PAGE_SIZE) {
        loop++;
      }
    }
    return ProductList;
  };
  const [ProductsWithUrl, ProductsWithTerm] = await Promise.all([
    fetchPageData(false),
    fetchPageData(true),
  ]);

  workers_monitor[Worker_Index] = `Combine Products`;
  const combinedProducts: Product[] = [...ProductsWithUrl, ...ProductsWithTerm];

  const uniqueProducts = Array.from(
    new Map(
      combinedProducts.map((product) => [
        product?.Products[0].Stockcode,
        product,
      ])
    ).values()
  );
  display[6] = display[6] + uniqueProducts.length;
  return uniqueProducts;
}
