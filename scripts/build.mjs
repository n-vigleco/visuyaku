import { copyFile, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "site", "index.html");
const output = join(root, "dist");
const nested = join(output, "visuyaku");

await rm(output, { recursive: true, force: true });
await mkdir(nested, { recursive: true });
await copyFile(source, join(output, "index.html"));
await copyFile(source, join(nested, "index.html"));

console.log("Built static assets for / and /visuyaku/.");
