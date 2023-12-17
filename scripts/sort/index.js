#!/usr/bin/env node

import { join } from "node:path";
import { sortJSON } from "./sortJSON/index.js";
import { sortYamlFile } from "./sortYamlFile/index.js";

start();

async function start() {
	const errors = [];

	async function call(fn, ...args) {
		try {
			await fn.apply(this, args);
		} catch (error) {
			errors.push(error);
		}
	}

	await Promise.all([
		call(sortYamlFile, join("fixtures", "crawlers.yml")),
		call(sortYamlFile, join("fixtures", "browsers.yml")),
		call(sortJSON, join("src", "patterns.json")),
	]);
	errors.forEach((error) => console.error(error));
	process.exitCode = errors.length;
}
