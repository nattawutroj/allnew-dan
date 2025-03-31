import { StoreTypes } from "../types";
import { format } from "date-fns";
import * as fs from "node:fs";
import path from "node:path";

export function InitialFiles(store: StoreTypes) {
  const dateStr = format(new Date(), "yyyy-MM-dd");
  const fileNameCombine = `danmurphys_${dateStr}_${store.postalCode}.csv`;

  const writeStreamCombine = fs.createWriteStream(
    path.resolve(process.cwd(), fileNameCombine)
  );
  return { writeStreamCombine };
}
