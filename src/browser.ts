/// <reference lib="dom" />

import { isbot } from ".";

(function () {
	if (typeof globalThis === "object") {
		Object.defineProperty(globalThis, "isbot", {
			value: isbot,
			enumerable: false,
			configurable: true,
		});
		return;
	}
	if (typeof window === "object") {
		Object.defineProperty(window, "isbot", {
			value: isbot,
			enumerable: false,
			configurable: true,
		});
		return;
	}
	if (typeof global === "object") {
		Object.defineProperty(global, "isbot", {
			value: isbot,
			enumerable: false,
			configurable: true,
		});
		return;
	}
	if (typeof self === "object") {
		Object.defineProperty(self, "isbot", {
			value: isbot,
			enumerable: false,
			configurable: true,
		});
	}
})();
