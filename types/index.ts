export type StoreTypes = {
  name: string;
  postalCode: number;
  storeNo: number;
};

export enum PartEnum {
  UrlFriendlyTerm = "URLTerm",
  Term = "Term",
}

export enum AggregationsEnum {
  Brand = "brand",
  Variety = "Variety",
}

export enum AdditionalDetailsEnum {
  Title = "webtitle",
  PackageSize = "webliquorsize",
  DansMarketplace = "webdsvflag",
  Brand = "webbrandname",
  AlcoholVol = "webalcoholpercentage",
}

export type ScrapDataTypes = {
  STOCKCODE: string | null;
  PRODUCT_NAME: string | null;
  MEMBER_OFFER_INDICATOR: string | null;
  ONLINE_ONLY_MEMBER_OFFER_INDICATOR: string | null;
  PRICE: number | null;
  MEMBER_PRICE: number | null;
  SAVINGS_AMOUNT: number | null;
  LOYALTY_MULTIPLIER: number | null;
  PACKAGE_SIZE: string | null;
  PACKAGE_TYPE: string | null;
  PACK_FORMAT: number | null;
  BRAND: string | null;
  CATEGORY: string | null;
  SUBCATEGORY: string | null;
  ALCOHOL_VOLUME: number | null;
  DANS_MARKETPLACE: string | null;
  STOCK_AVAILABLE: string | null;
  PRODUCT_URL: string | null;
  POSTCODE: number | null;
  SCRAPE_DATE: string;
  FILENAME: string;
};

export type FiltersTypes = {
  Key: AggregationsEnum;
  Items: {
    Term?: string;
    UrlFriendlyTerm?: string;
    Parent: AggregationsEnum;
  }[];
}[];
