import { StoreTypes } from "../types";
import { format } from "date-fns";
import * as fs from "node:fs";
import path from "node:path";

export function InitialFiles(store: StoreTypes) {
  const dateStr = format(new Date(), "yyyy-MM-dd");
  const fileNameUrl = `danmurphys_${dateStr}_${store.postalCode}Url.csv`;
  const fileNameTerm = `danmurphys_${dateStr}_${store.postalCode}Term.csv`;
  const fileNameCombine = `danmurphys_${dateStr}_${store.postalCode}.csv`;

  const writeStreamUrl = fs.createWriteStream(
    path.resolve(process.cwd(), fileNameUrl)
  );
  const writeStreamTerm = fs.createWriteStream(
    path.resolve(process.cwd(), fileNameTerm)
  );
  const writeStreamCombine = fs.createWriteStream(
    path.resolve(process.cwd(), fileNameCombine)
  );
  return { writeStreamUrl, writeStreamTerm, writeStreamCombine };
}
