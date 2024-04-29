import { isbot } from ".";

(function () {
	if (typeof globalThis === "object") {
		globalThis.isbot = isbot;
		return;
	}
	if (typeof window === "object") {
		window.isbot = isbot;
		return;
	}
	if (typeof global === "object") {
		global.isbot = isbot;
		return;
	}
	if (typeof self === "object") {
		self.isbot = isbot;
	}
})();
