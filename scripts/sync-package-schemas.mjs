import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const sourceDir = path.join(root, "schemas", "trace", "v1");
const targetDir = path.join(root, "packages", "schemas", "trace", "v1");

if (!fs.existsSync(sourceDir)) {
  throw new Error(`Missing source schema directory: ${sourceDir}`);
}

fs.mkdirSync(targetDir, { recursive: true });

for (const file of fs.readdirSync(targetDir)) {
  if (file.endsWith(".schema.json")) {
    fs.rmSync(path.join(targetDir, file));
  }
}

for (const file of fs.readdirSync(sourceDir)) {
  if (!file.endsWith(".schema.json")) continue;
  fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, file));
}

console.log("Synced package schema files.");
