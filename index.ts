import { GetAllProducts } from "./hook/GetAllProducts";
import { InitialFiles } from "./hook/InitialFiles";
import { ChangeStore, Stores } from "./store";

export default function main() {
  for (const Store of Stores) {
    const { writeStreamUrl, writeStreamTerm, writeStreamCombine } =
      InitialFiles(Store);

    ChangeStore(Store);
    GetAllProducts(Store, writeStreamCombine);
  }
}

main();
