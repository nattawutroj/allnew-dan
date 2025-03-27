import cloudscraper from "cloudscraper";
import { getChangeStoreConfig } from "../api";
import { DataTypeStoreChanges } from "../types/storeChange";

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
  {
    name: "Oaklands Park (Marion)",
    postalCode: 5046,
    storeNo: 5656,
  },
  // {
  //   name: "Launceston",
  //   postalCode: 7250,
  //   storeNo: 7230,
  // },
  // {
  //   name: "Brighton (East)",
  //   postalCode: 3187,
  //   storeNo: 3440,
  // },
  // {
  //   name: "Balga",
  //   postalCode: 6061,
  //   storeNo: 4413,
  // },
];

export async function ChangeStore(store: {
  name: string;
  postalCode: number;
  storeNo: number;
}) {
  var res;
  while (true) {
    try {
      res = await cloudscraper(getChangeStoreConfig(store.storeNo));
      break;
    } catch {
      console.log(`Retry >>>>  Get Store Config Store ${store.storeNo}`);
    }
  }
  const data = JSON.parse(res);
  const { Success, ClickAndCollectDetails } = data as DataTypeStoreChanges;
  if (Success)
    console.log(
      `Changed store to: ${ClickAndCollectDetails.AddressSuburb} (${ClickAndCollectDetails.AddressPostalCode})`
    );
}
