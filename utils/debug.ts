import * as fs from "node:fs";
import path from "node:path";

export function DebugToFile(value: any) {
  const writeStreamUrl = fs.createWriteStream(
    path.resolve(process.cwd(), "debug.txt")
  );
  writeStreamUrl.write(value);
}
