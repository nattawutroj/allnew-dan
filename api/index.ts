import { AGGREGATIONS_TARGET, APIHeaders, PAGE_SIZE } from "../config";
import { FiltersTypes } from "../types";
import { AggregationResult } from "../types/productSearchConfig";

export function getChangeStoreConfig(storeNo: number) {
  return {
    url: "https://api.danmurphys.com.au/apis/ui/Fulfilment/Pickup",
    method: "POST",
    headers: APIHeaders,
    body: JSON.stringify({
      StoreNo: storeNo,
      PickupOption: true,
    }),
  };
}

export function getProductSearchConfig(page?: number) {
  return {
    url: "https://api.danmurphys.com.au/apis/ui/Search/products",
    method: "POST",
    headers: APIHeaders,
    body: JSON.stringify({
      Filters: [],
      PageSize: PAGE_SIZE,
      PageNumber: page || 1,
      SortType: "Name",
      Location: "ListerFacet",
      PageUrl: "/search",
    }),
  };
}

export function getStockCodeList(
  aggResult: AggregationResult,
  page?: number,
  isTerm?: boolean
) {
  const Filters: FiltersTypes = [];

  if (isTerm) {
    Filters.push({
      Key: AGGREGATIONS_TARGET,
      Items: [
        {
          Term: aggResult.Term,
          Parent: AGGREGATIONS_TARGET,
        },
      ],
    });
  } else {
    Filters.push({
      Key: AGGREGATIONS_TARGET,
      Items: [
        {
          UrlFriendlyTerm: aggResult.UrlFriendlyTerm,
          Parent: AGGREGATIONS_TARGET,
        },
      ],
    });
  }

  return {
    url: "https://api.danmurphys.com.au/apis/ui/Search/products",
    method: "POST",
    headers: APIHeaders,
    body: JSON.stringify({
      Filters,
      PageSize: PAGE_SIZE,
      PageNumber: page || 1,
      SortType: "Name",
      Location: "ListerFacet",
    }),
  };
}