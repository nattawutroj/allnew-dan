import cloudscraper from "cloudscraper";
import { getProductSearchConfig } from "../api";
import { ProductSearchConfigTypes } from "../types/productSearchConfig";
import { DELAY, MAX_RETRIES } from "../config";
import { delay } from "../utils/general";
import { display } from "../display";

export default async function GetAggregations() {
  let res;
  let retries = 0;

  display[3] = "Get Aggregations";

  while (retries <= MAX_RETRIES) {
    try {
      res = await cloudscraper(getProductSearchConfig());
      return JSON.parse(res) as ProductSearchConfigTypes;
    } catch (error) {
      display[3] = `Error fetching aggregation`;
      retries++;

      if (retries > MAX_RETRIES) {
        display[3] = `Max retries reached. Failing.`;
        break;
      }

      display[3] = `Retrying GetAggregations... (${retries}/${MAX_RETRIES})`;

      await delay(DELAY);
    }
  }

  if (retries > MAX_RETRIES)
    display[3] = "Failed to retrieve aggregations after multiple attempts.";
}
