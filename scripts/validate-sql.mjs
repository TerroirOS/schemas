import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = [
  path.join(root, "sql", "trace", "v1", "schema.sql"),
  path.join(root, "sql", "trace", "v1", "supabase.schema.sql"),
  path.join(root, "sql", "trace", "v1", "migrations", "001_initial_schema.sql")
];

const requiredTables = [
  "producers",
  "batches",
  "issuers",
  "batch_events",
  "documents",
  "chain_transactions"
];

for (const file of files) {
  if (!fs.existsSync(file)) {
    throw new Error(`Missing SQL file: ${file}`);
  }
  const sql = fs.readFileSync(file, "utf8");
  if (sql.trim().length < 20) {
    throw new Error(`SQL file appears empty: ${file}`);
  }
  if (file.endsWith("001_initial_schema.sql") && !/ENABLE ROW LEVEL SECURITY/i.test(sql)) {
    throw new Error("Initial migration must include RLS setup.");
  }
}

const schemaSql = fs.readFileSync(files[0], "utf8").toLowerCase();
for (const table of requiredTables) {
  if (!schemaSql.includes(`create table if not exists ${table}`)) {
    throw new Error(`schema.sql missing required table: ${table}`);
  }
}

console.log("SQL sanity validation passed.");
