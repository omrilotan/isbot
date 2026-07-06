/// <reference lib="dom" />

import { isBot } from ".";

["isbot", "isBot"].forEach((name) => {
	if (typeof globalThis === "object") {
		Object.defineProperty(globalThis, name, {
			value: isBot,
			enumerable: false,
			configurable: true,
		});
		return;
	}
	if (typeof window === "object") {
		Object.defineProperty(window, name, {
			value: isBot,
			enumerable: false,
			configurable: true,
		});
		return;
	}
	if (typeof global === "object") {
		Object.defineProperty(global, name, {
			value: isBot,
			enumerable: false,
			configurable: true,
		});
		return;
	}
	if (typeof self === "object") {
		Object.defineProperty(self, name, {
			value: isBot,
			enumerable: false,
			configurable: true,
		});
	}
});
