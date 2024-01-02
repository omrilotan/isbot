#!/usr/bin/env node

import { writeFile } from "node:fs/promises";
import patterns from "../../src/patterns.json" assert { type: "json" };

const pattern = new RegExp(patterns.join("|"), "i").toString();
const code = `
export const regex: RegExp = ${pattern};
export const parts: number = ${patterns.length};
export const size: number = ${pattern.length};
`.trim();
await writeFile("src/pattern.ts", code);
