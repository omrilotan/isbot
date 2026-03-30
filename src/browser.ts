/// <reference lib="dom" />

import { isbot } from ".";

(function () {
	if (typeof globalThis === "object") {
		globalThis.isbot = isbot;
		return;
	}
	if (typeof window === "object") {
		// @ts-expect-error
		window.isbot = isbot;
		return;
	}
	if (typeof global === "object") {
		global.isbot = isbot;
		return;
	}
	if (typeof self === "object") {
		// @ts-expect-error
		self.isbot = isbot;
	}
})();
