#!/usr/bin/env node

import { writeFile } from "node:fs/promises";
import patterns from "../../src/patterns.json" assert { type: "json" };

const pattern = new RegExp(
	patterns
		.map((pattern) => pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
		.join("|"),
)
	.toString()
	.slice(1, -1);

const code = [
	`export const fullPattern: string = "${pattern}";`,
	`export const regularExpression: RegExp = /${pattern}/i;`,
].join("\n");
await writeFile("src/pattern.ts", code);
