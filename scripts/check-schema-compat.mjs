import { execSync } from "node:child_process";
import fs from "node:fs";

function getLastTag() {
  try {
    return execSync("git describe --tags --abbrev=0 --match 'v*'", { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

function parseVersion(v) {
  const [major = "0", minor = "0", patch = "0"] = v.split(".");
  return { major: Number(major), minor: Number(minor), patch: Number(patch) };
}

const lastTag = getLastTag();
if (!lastTag) {
  console.log("No prior tag found; compatibility check skipped.");
  process.exit(0);
}

const currentPkg = JSON.parse(fs.readFileSync("packages/schemas/package.json", "utf8"));
const previousPkg = JSON.parse(execSync(`git show ${lastTag}:packages/schemas/package.json`, { encoding: "utf8" }));

const currentV = parseVersion(currentPkg.version);
const previousV = parseVersion(previousPkg.version);

const diff = execSync(`git diff --unified=0 ${lastTag}..HEAD -- schemas/trace/v1`, {
  encoding: "utf8"
});

const breakingRisk = /^-.*"(required|enum|type|minLength|maxLength|minItems|maxItems|pattern|const)"/m.test(diff);

if (breakingRisk && currentV.major <= previousV.major) {
  console.error("Breaking-risk schema change detected without major version bump.");
  console.error(`Previous version: ${previousPkg.version}, current version: ${currentPkg.version}`);
  process.exit(1);
}

console.log("Compatibility guard passed.");
