import UserAgent from "user-agents";
import data from "./index.json";

const { browsers, crawlers } = data as {
	browsers: string[];
	crawlers: string[];
};

const random = Array(2000)
	.fill(null)
	.map(() => new UserAgent())
	.map(({ data: { userAgent: ua } }) => ua)
	.filter((ua) => !crawlers.includes(ua))
	.filter(Boolean);

browsers.push(...random.filter((ua) => !crawlers.includes(ua)));

export { browsers, crawlers };
