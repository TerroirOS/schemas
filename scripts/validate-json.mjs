import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const targets = [
  path.join(root, "schemas"),
  path.join(root, "examples")
];

let parsed = 0;

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (!entry.name.endsWith(".json")) continue;
    JSON.parse(fs.readFileSync(fullPath, "utf8"));
    parsed += 1;
  }
}

for (const target of targets) walk(target);

if (parsed === 0) {
  throw new Error("No JSON files parsed.");
}

console.log(`JSON syntax validation passed (${parsed} files).`);
