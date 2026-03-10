import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const root = process.cwd();
const pkgDir = path.join(root, "packages", "schemas");

execSync("npm pack", { cwd: pkgDir, stdio: "inherit" });
const tgz = fs.readdirSync(pkgDir).find((f) => f.endsWith(".tgz"));
if (!tgz) {
  throw new Error("No packed tarball found.");
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "schemas-import-check-"));
execSync("npm init -y", { cwd: tmp, stdio: "ignore" });
execSync(`npm install ${path.join(pkgDir, tgz)}`, { cwd: tmp, stdio: "inherit" });

const checkFile = path.join(tmp, "check-imports.cjs");
const checkScript = [
  "const pkg = require('@terroiros/schemas');",
  "if (!pkg.traceEventSchema) throw new Error('Missing traceEventSchema export');",
  "const schema = require('@terroiros/schemas/trace/v1/trace-event.schema.json');",
  "if (!schema || !schema.$id) throw new Error('Missing JSON schema export');",
  "console.log('imports-ok');"
].join("\n");

fs.writeFileSync(checkFile, checkScript, "utf8");
execSync("node check-imports.cjs", { cwd: tmp, stdio: "inherit" });

fs.rmSync(checkFile);
fs.rmSync(path.join(pkgDir, tgz));
console.log("Package import checks passed.");
