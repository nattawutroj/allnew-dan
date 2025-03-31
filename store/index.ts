import cloudscraper from "cloudscraper";
import { getChangeStoreConfig } from "../api";
import { DataTypeStoreChanges } from "../types/storeChange";
import { delay } from "../utils/general";
import { display } from "../display";

export type StoreTypes = {
  name: string;
  postalCode: number;
  storeNo: number;
};
export const Stores = [
  // {
  //   name: "Thornleigh",
  //   postalCode: 2120,
  //   storeNo: 1546,
  // },
  // {
  //   name: "West End",
  //   postalCode: 4101,
  //   storeNo: 6979,
  // },
  // {
  //   name: "Oaklands Park (Marion)",
  //   postalCode: 5046,
  //   storeNo: 5656,
  // },
  {
    name: "Launceston",
    postalCode: 7250,
    storeNo: 7230,
  },
  {
    name: "Brighton (East)",
    postalCode: 3187,
    storeNo: 3440,
  },
  {
    name: "Balga",
    postalCode: 6061,
    storeNo: 4413,
  },
];

export async function ChangeStore(store: StoreTypes) {
  display[3] = `ChangeStore`;
  var res;
  while (true) {
    try {
      await delay(200);
      res = await cloudscraper(getChangeStoreConfig(store.storeNo));
      break;
    } catch {
      display[3] = `Retry >> Get Store Config Store ${store.storeNo}`;
    }
  }
  const data = JSON.parse(res);
  const { Success, ClickAndCollectDetails } = data as DataTypeStoreChanges;
  if (Success)
    display[3] = `Changed store to: ${ClickAndCollectDetails.AddressSuburb} (${ClickAndCollectDetails.AddressPostalCode})`;
}
