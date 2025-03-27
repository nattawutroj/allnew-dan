import * as fs from "node:fs";
import path from "node:path";

export function DebugToFile(value: any, name: string = "debug.txt") {
  const writeStreamUrl = fs.createWriteStream(
    path.resolve(process.cwd(), name)
  );
  writeStreamUrl.write(value);
}
