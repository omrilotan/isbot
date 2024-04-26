#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
// import patterns from "../../src/patterns.json" assert { type: "json" }; // node < 22
// import patterns from "../../src/patterns.json" with { type: "json" }; // node >= 22
// TODO: Fix the import statement ESM import attributes are more consistent between active versions
// @see https://nodejs.org/api/esm.html#import-attributes
const patterns = JSON.parse(
	await readFile("src/patterns.json", { encoding: "utf-8" }),
);

const pattern = new RegExp(
	patterns
		.map((pattern) => pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
		.join("|"),
).source;

const expression = new RegExp(patterns.join("|"), "i").toString();

const code = `export const fullPattern: string = "${pattern}";\n`;
await writeFile("src/pattern.ts", code);
