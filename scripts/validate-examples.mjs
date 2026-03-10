import fs from "node:fs";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const root = process.cwd();
const schemaDir = path.join(root, "schemas", "trace", "v1");
const validExamplePath = path.join(root, "examples", "trace", "georgian-wine.v1.valid.json");
const invalidExamplePath = path.join(root, "examples", "trace", "georgian-wine.v1.invalid.json");

const ajv = new Ajv2020({ strict: true, allErrors: true });
addFormats(ajv);

const schemas = {};
for (const file of fs.readdirSync(schemaDir)) {
  if (!file.endsWith(".schema.json")) continue;
  const schema = JSON.parse(fs.readFileSync(path.join(schemaDir, file), "utf8"));
  schemas[file] = schema;
  ajv.addSchema(schema, schema.$id);
}

const validPayload = JSON.parse(fs.readFileSync(validExamplePath, "utf8"));
const invalidPayload = JSON.parse(fs.readFileSync(invalidExamplePath, "utf8"));

const map = [
  ["producer", "producer.schema.json"],
  ["batch", "batch.schema.json"],
  ["issuer", "issuer.schema.json"],
  ["traceEvent", "trace-event.schema.json"],
  ["verificationResult", "verification-result.schema.json"]
];

for (const [key, file] of map) {
  const schema = schemas[file];
  const ok = ajv.validate(schema.$id, validPayload[key]);
  if (!ok) {
    console.error(`Expected valid example segment to pass: ${key}`);
    console.error(ajv.errors);
    process.exit(1);
  }
}

let invalidFailures = 0;
for (const [key, file] of map) {
  const schema = schemas[file];
  const ok = ajv.validate(schema.$id, invalidPayload[key]);
  if (!ok) {
    invalidFailures += 1;
  }
}

if (invalidFailures < map.length) {
  throw new Error(`Invalid example did not fail all segments (${invalidFailures}/${map.length}).`);
}

console.log("Example validation passed (valid accepted, invalid rejected).");
