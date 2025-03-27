export interface ProductSearchConfigTypes {
  Products?: Product[] | null;
  AvailableProductsCount?: number | null;
  DidYouMean?: any | null;
  SearchSource?: string | null;
  InspirationCards?: InspirationCards | null;
  Corrections?: any | null;
  SearchResultsCount?: number | null;
  Aggregations?: Aggregation[] | null;
  Banners?: any[] | null;
  SearchTerm?: string | null;
}

export interface Product {
  Name?: string | null;
  PackDefaultStockCode?: string | null;
  PackParentStockCode?: string | null;
  Products?: Product2[] | null;
  PackMessage?: string | null;
  IsInDefaultList?: boolean | null;
  IsPersonalised?: boolean | null;
}

export interface Product2 {
  Stockcode?: string | null;
  Prices?: Prices | null;
  Inventory?: Inventory | null;
  Description?: string | null;
  SmallImageFile?: string | null;
  MediumImageFile?: string | null;
  LargeImageFile?: string | null;
  IsOnSpecial?: boolean | null;
  IsMemberSpecial?: boolean | null;
  IsEdrSpecial?: boolean | null;
  QuantityInTrolley?: number | null;
  Unit?: string | null;
  MinimumQuantity?: number | null;
  IsInTrolley?: boolean | null;
  Source?: string | null;
  SupplyLimit?: number | null;
  PackageSize?: string | null;
  IsForCollection?: boolean | null;
  IsForDelivery?: boolean | null;
  IsPurchasable?: boolean | null;
  IsFindMeAvailable?: boolean | null;
  ShouldShowFindMeCta?: boolean | null;
  ProductTags?: ProductTag[] | null;
  ProductSashes?: ProductSash[] | null;
  UniqueSellingProposition?: UniqueSellingProposition[] | null;
  InfoMessage?: InfoMessage | null;
  AlcVolMessage?: any | null;
  AgeRestricted?: boolean | null;
  IsStickyPricingAvailabilityEnabled?: boolean | null;
  DisplayQuantity?: number | null;
  RichDescription?: string | null;
  IsFeaturedTag?: boolean | null;
  OverallRating?: number | null;
  NumberOfReviews?: number | null;
  IsNew?: boolean | null;
  ImageVariants?: any[] | null;
  AdditionalDetails?: AdditionalDetail[] | null;
  ParentStockCode?: string | null;
  StockOnHand?: number | null;
  BackorderStockOnHand?: number | null;
  IsPreSale?: boolean | null;
  IsComingSoon?: boolean | null;
  UrlFriendlyName?: string | null;
  AvailablePackTypes?: AvailablePackType[] | null;
  IsInWishList?: boolean | null;
  IsInDefaultList?: boolean | null;
  IsDeliveryOnly?: boolean | null;
  CrossSellDetails?: any | null;
}

export interface Prices {
  inanysixprice?: Inanysixprice | null;
  caseprice?: Caseprice | null;
  singleprice?: Singleprice | null;
  promoprice?: Promoprice | null;
}

export interface Inanysixprice {
  Message?: string | null;
  Value?: number | null;
  PreText?: any | null;
  BeforePromotion?: any | null;
  AfterPromotion?: any | null;
  IsMemberOffer?: boolean | null;
  MaxAward?: number | null;
  PackType?: string | null;
  PromotionType?: any | null;
}

export interface Caseprice {
  Message?: string | null;
  Value?: number | null;
  PreText?: any | null;
  BeforePromotion?: any | null;
  AfterPromotion?: any | null;
  IsMemberOffer?: boolean | null;
  MaxAward?: number | null;
  PackType?: string | null;
  PromotionType?: any | null;
}

export interface Singleprice {
  Message?: string | null;
  Value?: number | null;
  PreText?: string | null;
  BeforePromotion?: number | null;
  AfterPromotion?: number | null;
  IsMemberOffer?: boolean | null;
  MaxAward?: number | null;
  PackType?: string | null;
  PromotionType?: any | null;
}

export interface Promoprice {
  Message?: string | null;
  Value?: number | null;
  PreText?: string | null;
  BeforePromotion?: number | null;
  AfterPromotion?: number | null;
  IsMemberOffer?: boolean | null;
  MaxAward?: number | null;
  PackType?: string | null;
  PromotionType?: string | null;
}

export interface Inventory {
  availableinventoryqty?: number | null;
  backorderavailableinventoryqty?: number | null;
  backorderinventoryflag?: boolean | null;
  samedaydeliveryinventoryqty?: number | null;
  nextdaydeliveryinventoryqty?: number | null;
  pickadaydeliveryinventoryqty?: number | null;
  clickandcollect2hrsinventoryqty?: number | null;
  clickandcollect7daysinventoryqty?: number | null;
  findinstoreinventoryqty?: number | null;
  samedaydeliveryinventoryqtymessage?: string | null;
  nextdaydeliveryinventoryqtymessage?: string | null;
  pickadaydeliveryinventoryqtymessage?: string | null;
  clickandcollect2hrsinventoryqtymessage?: string | null;
  clickandcollect7daysinventoryqtymessage?: string | null;
  findinstoreinventoryqtymessage?: string | null;
  isfindme2hrsinventoryavailable?: boolean | null;
  isfindme7daysinventoryavailable?: boolean | null;
  isfindmedeliveryinventoryavailable?: boolean | null;
  onlineinventoryqty?: number | null;
}

export interface ProductTag {
  TagContent?: string | null;
  TagLink?: string | null;
  FallbackText?: string | null;
  TagType?: string | null;
  TagCriteria?: string | null;
  CriteriaValue?: any | null;
}

export interface ProductSash {
  TagContent?: string | null;
  TagLink?: any | null;
  FallbackText?: any | null;
  TagType?: string | null;
  TagCriteria?: string | null;
  CriteriaValue?: any | null;
}

export interface UniqueSellingProposition {
  Name?: string | null;
  Icon?: string | null;
  Url?: string | null;
  Content?: string | null;
  Alt?: string | null;
}

export interface InfoMessage {
  Name?: string | null;
  Icon?: string | null;
  Url?: string | null;
  Content?: string | null;
  Alt?: string | null;
}

export interface AdditionalDetail {
  Name?: string | null;
  DisplayName?: string | null;
  Value?: any | null;
}

export interface AvailablePackType {
  Key?: string | null;
  DisplayName?: string | null;
  UnitQty?: number | null;
}

export interface InspirationCards {
  Cards?: Cards | null;
}

export interface Cards {}

export interface Aggregation {
  Name?: string | null;
  UrlFriendlyTerm?: string | null;
  DisplayName?: string | null;
  Type?: string | null;
  FilterType?: string | null;
  FilterDataType?: string | null;
  Results?: AggregationResult[] | null;
  State?: string | null;
  Rank?: number | null;
  AdditionalResults?: boolean | null;
  DesignType?: string | null;
  AggregationStats?: any | null;
}

export interface AggregationResult {
  Name?: string | null;
  Term?: string | null;
  UrlFriendlyTerm?: string | null;
  Min?: number | null;
  Max?: number | null;
  Applied?: boolean | null;
  Count?: number | null;
}
