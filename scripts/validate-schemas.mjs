import fs from "node:fs";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const root = process.cwd();
const dir = path.join(root, "schemas", "trace", "v1");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".schema.json"));

const ajv = new Ajv2020({ strict: true, allErrors: true });
addFormats(ajv);

const schemas = files.map((file) => {
  const schema = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  return { file, schema };
});

for (const { schema } of schemas) {
  if (!schema.$id) {
    throw new Error("Schema missing $id");
  }
  ajv.addSchema(schema, schema.$id);
}

for (const { file, schema } of schemas) {
  const valid = ajv.validateSchema(schema);
  if (!valid) {
    console.error(`Schema invalid: ${file}`);
    console.error(ajv.errors);
    process.exit(1);
  }
}

console.log(`Schema meta-validation passed (${schemas.length} schemas).`);
