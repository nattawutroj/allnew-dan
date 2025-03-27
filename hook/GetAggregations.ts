import cloudscraper from "cloudscraper";
import { getProductSearchConfig } from "../api";
import { ProductSearchConfigTypes } from "../types/productSearchConfig";
import { MAX_RETRIES } from "../config";

export default async function GetAggregations() {
  let res;
  let retries = 0;

  while (retries <= MAX_RETRIES) {
    try {
      res = await cloudscraper(getProductSearchConfig());
      return JSON.parse(res) as ProductSearchConfigTypes;
    } catch (error) {
      console.error(`Error fetching aggregation`);
      retries++;

      if (retries > MAX_RETRIES) {
        console.error(`Max retries reached. Failing.`);
        break;
      }

      console.log(`Retrying GetAggregations... (${retries}/${MAX_RETRIES})`);
    }
  }

  throw new Error("Failed to retrieve aggregations after multiple attempts.");
}
