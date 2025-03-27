type OpeningHour = {
  Day: string | null;
  Hours: string | null;
  Date: string | null;
};

type QueueLength = {
  Type: string | null;
  HtmlText: string | null;
};

type ClickAndCollectDetails = {
  AddressPhone: string | null;
  OpeningHours: (OpeningHour | null)[] | null;
  Latitude: string | null;
  Longitude: string | null;
  ClickAndCollectOption: string | null;
  IsOpeningHoursOverridden: boolean | null;
  QueueLength: QueueLength | null;
  HasDirectToBoot: boolean | null;
  FulfilmentStoreID: string | null;
  FulfilmentStoreName: string | null;
  AddressId: string | null;
  AddressStreet1: string | null;
  AddressStreet2: string | null;
  AddressSuburb: string | null;
  AddressState: string | null;
  AddressCountry: string | null;
  AddressPostalCode: string | null;
  AddressCity: string | null;
  IsFavouriteStoreSet: boolean | null;
  IsClickAndCollectEnabled: boolean | null;
  IsDeliveryEnabled: boolean | null;
  IsBackOrderEnabled: boolean | null;
  AddressType: string | null;
  Suburb: string | null;
  PostCode: number | null;
  State: string | null;
};

export type DataTypeStoreChanges = {
  ClickAndCollectDetails: ClickAndCollectDetails | null;
  Success: boolean | null;
};
