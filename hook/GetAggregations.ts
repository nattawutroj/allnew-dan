import cloudscraper from "cloudscraper";
import { getProductSearchConfig } from "../api";
import { ProductSearchConfigTypes } from "../types/productSearchConfig";

var RRRetry = 0;
export default async function GetAggregations() {
  var res;
  RRRetry = 0;
  while (true) {
    try {
      res = await cloudscraper(getProductSearchConfig());
      break;
    } catch {
      console.log("retry >>>> GetAggregations " + ` ${RRRetry}`);
      if (RRRetry > 499) {
        break;
      }
    }
  }
  return JSON.parse(res) as ProductSearchConfigTypes;
}
