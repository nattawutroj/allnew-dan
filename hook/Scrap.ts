import { format } from "date-fns";
import { AdditionalDetailsEnum, ScrapDataTypes, StoreTypes } from "../types";
import {
  AdditionalDetail,
  PricesType,
  Product,
} from "../types/productSearchConfig";

function FindInAdditional(additionalDetails: AdditionalDetail[], name: string) {
  const detail = additionalDetails.find((detail) => detail.Name == name);
  return detail ? detail.Value : null;
}

export async function Scrap(store: StoreTypes, product: Product) {
  return Object?.entries(product?.Products?.[0]?.Prices)?.map(([_, value]) => {
    const data: ScrapDataTypes = {
      STOCKCODE: null,
      PRODUCT_NAME: null,
      MEMBER_OFFER_INDICATOR: null,
      ONLINE_ONLY_MEMBER_OFFER_INDICATOR: null,
      PRICE: null,
      MEMBER_PRICE: null,
      SAVINGS_AMOUNT: null,
      LOYALTY_MULTIPLIER: null,
      PACKAGE_SIZE: null,
      PACKAGE_TYPE: null,
      PACK_FORMAT: null,
      BRAND: null,
      CATEGORY: null,
      SUBCATEGORY: null,
      ALCOHOL_VOLUME: null,
      DANS_MARKETPLACE: null,
      STOCK_AVAILABLE: null,
      PRODUCT_URL: null,
      POSTCODE: store?.postalCode ?? null,
      SCRAPE_DATE: format(new Date(), "yyyy-MM-dd"),
      FILENAME: `danmurphys_${format(new Date(), "yyyy-MM-dd")}_${
        store?.postalCode
      }?.csv`,
    };
    const priceBreak = value as PricesType;
    data.STOCKCODE = product?.PackDefaultStockCode;
    data.PRODUCT_NAME = FindInAdditional(
      product?.Products?.[0]?.AdditionalDetails,
      AdditionalDetailsEnum?.Title
    );
    data.MEMBER_OFFER_INDICATOR = Boolean(priceBreak?.IsMemberOffer)
      ? "Y"
      : "N";
    data.ONLINE_ONLY_MEMBER_OFFER_INDICATOR =
      priceBreak?.PreText == "Online Only Member Offer" ? "Y" : "N";
    data.PRICE = priceBreak?.Value;
    data.MEMBER_PRICE = Boolean(priceBreak?.IsMemberOffer)
      ? priceBreak?.AfterPromotion
      : null;
    data.SAVINGS_AMOUNT = priceBreak?.IsMemberOffer
      ? +(priceBreak?.BeforePromotion - priceBreak?.AfterPromotion)?.toFixed(2)
      : null;

    data.LOYALTY_MULTIPLIER = undefined;

    data.PACKAGE_SIZE = FindInAdditional(
      product?.Products?.[0]?.AdditionalDetails,
      AdditionalDetailsEnum?.PackageSize
    );
    data.PACKAGE_TYPE = priceBreak?.Message;
    data.PACK_FORMAT = product?.Products?.[0]?.AvailablePackTypes?.find(
      (a) => a?.Key == priceBreak?.PackType
    )?.UnitQty;
    data.BRAND = FindInAdditional(
      product?.Products?.[0]?.AdditionalDetails,
      AdditionalDetailsEnum?.Brand
    );
    data.CATEGORY = product?.Products?.[0]?.Categories?.[0]?.Name ?? null;
    data.SUBCATEGORY = product?.Products?.[0]?.Categories?.[1]?.Name ?? null;
    data.ALCOHOL_VOLUME = FindInAdditional(
      product?.Products?.[0]?.AdditionalDetails,
      AdditionalDetailsEnum?.AlcoholVol
    );
    data.DANS_MARKETPLACE = FindInAdditional(
      product?.Products?.[0]?.AdditionalDetails,
      AdditionalDetailsEnum?.DansMarketplace
    )
      ? "Y"
      : "N";
    (data.STOCK_AVAILABLE =
      !product?.Products?.[0]?.Inventory?.availableinventoryqty &&
      !product?.Products?.[0]?.Inventory?.isfindmedeliveryinventoryavailable
        ? "N"
        : "Y"),
      (data.PRODUCT_URL = `www.danmurphys.com.au/product/${product.PackDefaultStockCode}`);

    return data;
  });
}
