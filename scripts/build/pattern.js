#!/usr/bin/env node

import { writeFile } from "node:fs/promises";
import patterns from "../../src/patterns.json" assert { type: "json" };

const pattern = new RegExp(
	patterns
		.map((pattern) => pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
		.join("|"),
).source;

const expression = new RegExp(patterns.join("|"), "i").toString();

const code = `export const fullPattern: string = "${pattern}";\n`;
await writeFile("src/pattern.ts", code);
