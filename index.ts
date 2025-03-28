import { GetAllProducts } from "./hook/GetAllProducts";
import { InitialFiles } from "./hook/InitialFiles";
import { ChangeStore, Stores } from "./store";

export default async function main() {
  for (const Store of Stores) {
    const {
      writeStreamUrl,
      writeStreamTerm,
      writeStreamCombine,
      writeStreamInfo,
    } = InitialFiles(Store);

    await ChangeStore(Store);
    await GetAllProducts(Store, writeStreamCombine, writeStreamInfo);
  }
}

main();
