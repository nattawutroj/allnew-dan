export interface ProductSearchConfigTypes {
  Products: Product[] | null | undefined;
  AvailableProductsCount: number | null | undefined;
  DidYouMean: any | null | undefined;
  SearchSource: string | null | undefined;
  InspirationCards: InspirationCards | null | undefined;
  Corrections: any | null | undefined;
  SearchResultsCount: number | null | undefined;
  Aggregations: Aggregation[] | null | undefined;
  Banners: any[] | null | undefined;
  SearchTerm: string | null | undefined;
}

export interface Product {
  Name: string | null | undefined;
  PackDefaultStockCode: string | null | undefined;
  PackParentStockCode: string | null | undefined;
  Products: Product2[] | null | undefined;
  PackMessage: string | null | undefined;
  IsInDefaultList: boolean | null | undefined;
  IsPersonalised: boolean | null | undefined;
}

export interface Product2 {
  Stockcode: string | null | undefined;
  Prices: Prices | null | undefined;
  Inventory: Inventory | null | undefined;
  Description: string | null | undefined;
  SmallImageFile: string | null | undefined;
  MediumImageFile: string | null | undefined;
  LargeImageFile: string | null | undefined;
  IsOnSpecial: boolean | null | undefined;
  IsMemberSpecial: boolean | null | undefined;
  IsEdrSpecial: boolean | null | undefined;
  QuantityInTrolley: number | null | undefined;
  Unit: string | null | undefined;
  MinimumQuantity: number | null | undefined;
  IsInTrolley: boolean | null | undefined;
  Source: string | null | undefined;
  SupplyLimit: number | null | undefined;
  PackageSize: string | null | undefined;
  IsForCollection: boolean | null | undefined;
  IsForDelivery: boolean | null | undefined;
  IsPurchasable: boolean | null | undefined;
  IsFindMeAvailable: boolean | null | undefined;
  ShouldShowFindMeCta: boolean | null | undefined;
  ProductTags: ProductTag[] | null | undefined;
  ProductSashes: ProductSash[] | null | undefined;
  UniqueSellingProposition: UniqueSellingProposition[] | null | undefined;
  InfoMessage?: InfoMessage | null | undefined;
  AlcVolMessage: any | null | undefined;
  AgeRestricted: boolean | null | undefined;
  IsStickyPricingAvailabilityEnabled: boolean | null | undefined;
  DisplayQuantity: number | null | undefined;
  RichDescription: string | null | undefined;
  IsFeaturedTag: boolean | null | undefined;
  OverallRating: number | null | undefined;
  NumberOfReviews: number | null | undefined;
  IsNew: boolean | null | undefined;
  ImageVariants: any[] | null | undefined;
  AdditionalDetails: AdditionalDetail[] | null | undefined;
  ParentStockCode: string | null | undefined;
  StockOnHand: number | null | undefined;
  BackorderStockOnHand: number | null | undefined;
  IsPreSale: boolean | null | undefined;
  IsComingSoon: boolean | null | undefined;
  UrlFriendlyName: string | null | undefined;
  AvailablePackTypes: AvailablePackType[] | null | undefined;
  IsInWishList: boolean | null | undefined;
  IsInDefaultList: boolean | null | undefined;
  IsDeliveryOnly: boolean | null | undefined;
  CrossSellDetails: any | null | undefined;
}

export interface Prices {
  inanysixprice?: Inanysixprice | null | undefined;
  caseprice?: Caseprice | null | undefined;
  singleprice?: Singleprice | null | undefined;
  promoprice?: Promoprice | null | undefined;
}

export interface Inanysixprice {
  Message?: string | null | undefined;
  Value: number | null | undefined;
  PreText: any | null | undefined;
  BeforePromotion: any | null | undefined;
  AfterPromotion: any | null | undefined;
  IsMemberOffer: boolean | null | undefined;
  MaxAward: number | null | undefined;
  PackType?: string | null | undefined;
  PromotionType: any | null | undefined;
}

export interface Caseprice {
  Message: string | null | undefined;
  Value: number | null | undefined;
  PreText: any | null | undefined;
  BeforePromotion: any | null | undefined;
  AfterPromotion: any | null | undefined;
  IsMemberOffer: boolean | null | undefined;
  MaxAward: number | null | undefined;
  PackType: string | null | undefined;
  PromotionType: any | null | undefined;
}

export interface Singleprice {
  Message: string | null | undefined;
  Value: number | null | undefined;
  PreText?: string | null | undefined;
  BeforePromotion?: number | null | undefined;
  AfterPromotion?: number | null | undefined;
  IsMemberOffer: boolean | null | undefined;
  MaxAward: number | null | undefined;
  PackType: string | null | undefined;
  PromotionType: any | null | undefined;
}

export interface Promoprice {
  Message: string | null | undefined;
  Value: number | null | undefined;
  PreText: string | null | undefined;
  BeforePromotion: number | null | undefined;
  AfterPromotion: number | null | undefined;
  IsMemberOffer: boolean | null | undefined;
  MaxAward: number | null | undefined;
  PackType: string | null | undefined;
  PromotionType: string | null | undefined;
}

export interface Inventory {
  availableinventoryqty?: number | null | undefined;
  backorderavailableinventoryqty?: number | null | undefined;
  backorderinventoryflag?: boolean | null | undefined;
  samedaydeliveryinventoryqty?: number | null | undefined;
  nextdaydeliveryinventoryqty?: number | null | undefined;
  pickadaydeliveryinventoryqty?: number | null | undefined;
  clickandcollect2hrsinventoryqty?: number | null | undefined;
  clickandcollect7daysinventoryqty?: number | null | undefined;
  findinstoreinventoryqty?: number | null | undefined;
  samedaydeliveryinventoryqtymessage?: string | null | undefined;
  nextdaydeliveryinventoryqtymessage?: string | null | undefined;
  pickadaydeliveryinventoryqtymessage?: string | null | undefined;
  clickandcollect2hrsinventoryqtymessage?: string | null | undefined;
  clickandcollect7daysinventoryqtymessage?: string | null | undefined;
  findinstoreinventoryqtymessage?: string | null | undefined;
  isfindme2hrsinventoryavailable: boolean | null | undefined;
  isfindme7daysinventoryavailable: boolean | null | undefined;
  isfindmedeliveryinventoryavailable: boolean | null | undefined;
  onlineinventoryqty?: number | null | undefined;
}

export interface ProductTag {
  TagContent: string | null | undefined;
  TagLink?: string | null | undefined;
  FallbackText?: string | null | undefined;
  TagType: string | null | undefined;
  TagCriteria: string | null | undefined;
  CriteriaValue: any | null | undefined;
}

export interface ProductSash {
  TagContent: string | null | undefined;
  TagLink: any | null | undefined;
  FallbackText: any | null | undefined;
  TagType: string | null | undefined;
  TagCriteria: string | null | undefined;
  CriteriaValue: any | null | undefined;
}

export interface UniqueSellingProposition {
  Name: string | null | undefined;
  Icon: string | null | undefined;
  Url?: string | null | undefined;
  Content: string | null | undefined;
  Alt: string | null | undefined;
}

export interface InfoMessage {
  Name: string | null | undefined;
  Icon: string | null | undefined;
  Url: string | null | undefined;
  Content: string | null | undefined;
  Alt: string | null | undefined;
}

export interface AdditionalDetail {
  Name: string | null | undefined;
  DisplayName: string | null | undefined;
  Value: any | null | undefined;
}

export interface AvailablePackType {
  Key: string | null | undefined;
  DisplayName: string | null | undefined;
  UnitQty: number | null | undefined;
}

export interface InspirationCards {
  Cards: Cards | null | undefined;
}

export interface Cards {}

export interface Aggregation {
  Name: string | null | undefined;
  UrlFriendlyTerm: string | null | undefined;
  DisplayName: string | null | undefined;
  Type: string | null | undefined;
  FilterType: string | null | undefined;
  FilterDataType: string | null | undefined;
  Results: AggregationResult[] | null | undefined;
  State: string | null | undefined;
  Rank: number | null | undefined;
  AdditionalResults: boolean | null | undefined;
  DesignType: string | null | undefined;
  AggregationStats: any | null | undefined;
}

export interface AggregationResult {
  Name: string | null | undefined;
  Term?: string | null | undefined;
  UrlFriendlyTerm?: string | null | undefined;
  Min?: number | null | undefined;
  Max?: number | null | undefined;
  Applied: boolean | null | undefined;
  Count: number | null | undefined;
}
