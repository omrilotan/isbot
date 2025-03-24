export async function fetchWithTimeout(
	url,
	{ timeout = 30000, ...options } = {},
) {
	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), timeout);
	try {
		return await fetch(url, { ...options, signal: controller.signal }).finally(
			() => clearTimeout(id),
		);
	} catch (error) {
		if (error instanceof DOMException && error.name === "AbortError") {
			return new Response(null, { status: 408, statusText: "Request Timeout" });
		}
		if (error.cause?.code === "UNABLE_TO_VERIFY_LEAF_SIGNATURE") {
			return new Response(null, {
				status: 495,
				statusText: "SSL Certificate Error",
			});
		}
		throw error;
	}
}
