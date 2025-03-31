import { display, InitialDisplay, startStatusLogger } from "./display";
import { GetAllProducts } from "./hook/GetAllProducts";
import { InitialFiles } from "./hook/InitialFiles";
import { ChangeStore, Stores } from "./store";

export default async function main() {
  const statusLogger = startStatusLogger();
  for (const Store of Stores) {
    InitialDisplay();
    const { writeStreamCombine } = InitialFiles(Store);
    display[0] = Store.name;
    await ChangeStore(Store);
    await GetAllProducts(Store, writeStreamCombine);
  }
  clearInterval(statusLogger);
}

main();
