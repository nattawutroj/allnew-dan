import { AggregationsEnum } from "../types";
import { getRandomInt } from "../utils/general";

export const APIHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  "Content-Type": "application/json",
};

export const MAX_RETRIES = 20;
export const PAGE_SIZE = 50;

export const CONCURRENCY_LIMIT = 5;

export const DELAY = getRandomInt(150, 300);

export const AGGREGATIONS_TARGET = AggregationsEnum.Brand;
