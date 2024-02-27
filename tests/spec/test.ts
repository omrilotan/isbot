import {
	getPattern,
	list,
	isbot,
	isbotNaive,
	isbotMatch,
	isbotMatches,
	isbotPattern,
	isbotPatterns,
	createIsbot,
	createIsbotFromList,
} from "../../src";
import { fullPattern } from "../../src/pattern";
import { crawlers, browsers } from "../../fixtures";
let isbotInstance: any;

const BOT_USER_AGENT_EXAMPLE =
	"Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const BROWSER_USER_AGENT_EXAMPLE =
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91 Safari/537.36";

const USER_AGENT_COMMON = [
	"Ada Chat Bot/1.0 Request Block",
	"Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)",
	"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4590.2 Safari/537.36 Chrome-Lighthouse",
];
const USER_AGENT_GOTCHAS = [
	"Mozilla/5.0 (Linux; Android 10; CUBOT_X30) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.85 Mobile Safari/537.36",
	"PS4Application libhttp/1.000 (PS4) CoreMedia libhttp/6.72 (PlayStation 4)",
];

describe("isbot", () => {
	describe("features", () => {
		test("pattern: pattern is a regex", () => {
			expect(getPattern()).toBeInstanceOf(RegExp);
		});
		test("list: list is an array", () => {
			expect(list).toBeInstanceOf(Array);
			expect(list.every((item) => typeof item === "string")).toBe(true);
		});
		test("isbot: bot user agect string is recognised as bot", () => {
			expect(isbot(BOT_USER_AGENT_EXAMPLE)).toBe(true);
		});
		test("isbotMatch: find pattern in bot user agent string", () => {
			expect(isbotMatch(BOT_USER_AGENT_EXAMPLE)).toBe("Google");
		});
		test("isbotMatches: find all patterns in bot user agent string", () => {
			expect(isbotMatches(BOT_USER_AGENT_EXAMPLE)).toContain("Google");
			expect(isbotMatches(BOT_USER_AGENT_EXAMPLE)).toHaveLength(4);
		});
		test("isbotPattern: find first pattern in bot user agent string", () => {
			expect(isbotPattern(BOT_USER_AGENT_EXAMPLE)).toBe(
				"(?<! (?:channel/|google/))google(?!(app|/google| pixel))",
			);
		});
		test("isbotPatterns: find all patterns in bot user agent string", () => {
			expect(isbotPatterns(BOT_USER_AGENT_EXAMPLE)).toContain(
				"(?<! (?:channel/|google/))google(?!(app|/google| pixel))",
			);
			expect(isbotPatterns(BOT_USER_AGENT_EXAMPLE)).toHaveLength(4);
		});
		test("createIsbot: create custom isbot function with custom pattern", () => {
			const customIsbot = createIsbot(/bot/i);
			expect(customIsbot(BOT_USER_AGENT_EXAMPLE)).toBe(true);
		});
		test("createIsbotFromList: create custom isbot function with custom pattern", () => {
			const ChromeLighthouseUserAgentStrings: string[] = [
				"mozilla/5.0 (macintosh; intel mac os x 10_15_7) applewebkit/537.36 (khtml, like gecko) chrome/94.0.4590.2 safari/537.36 chrome-lighthouse",
				"mozilla/5.0 (linux; android 7.0; moto g (4)) applewebkit/537.36 (khtml, like gecko) chrome/94.0.4590.2 mobile safari/537.36 chrome-lighthouse",
			];
			const patternsToRemove: Set<string> = new Set(
				ChromeLighthouseUserAgentStrings.map(isbotMatches).flat(),
			);
			const isbot2 = createIsbotFromList(
				list.filter(
					(record: string): boolean => patternsToRemove.has(record) === false,
				),
			);
			const [ua] = ChromeLighthouseUserAgentStrings;
			expect(isbot(ua)).toBe(true);
			expect(isbot2(ua)).toBe(false);
		});
		test.each([null, undefined, ""])(
			"all functions can accept %p",
			(value: string | null | undefined) => {
				expect(isbot(value)).toBe(false);
				expect(isbotMatch(value)).toBe(null);
				expect(isbotMatches(value)).toEqual([]);
				expect(isbotPattern(value)).toBe(null);
				expect(isbotPatterns(value)).toEqual([]);
			},
		);
	});

	describe("isbotNaive", () => {
		test.each([75])(
			"a large number of user agent strings can be detected (>%s%)",
			(percent) => {
				const ratio =
					crawlers.filter((ua) => isbotNaive(ua)).length / crawlers.length;
				expect(ratio).toBeLessThan(1);
				expect(ratio).toBeGreaterThan(percent / 100);
			},
		);
		test.each([1])(
			"a small number of browsers is falsly detected as bots (<%s%)",
			(percent) => {
				const ratio =
					browsers.filter((ua) => isbotNaive(ua)).length / browsers.length;
				expect(ratio).toBeGreaterThan(0);
				expect(ratio).toBeLessThan(percent / 100);
			},
		);
	});

	describe("regex fallback", () => {
		beforeAll(async () => {
			jest
				.spyOn(globalThis, "RegExp")
				.mockImplementation((pattern, flags): RegExp => {
					if ((pattern as string).includes?.("?<!")) {
						throw new Error("Invalid regex");
					}
					return new RegExp(pattern, flags);
				});
			const mdl = await import("../../index.js");
			if (!mdl) {
				throw new Error("Module not found");
			}
			isbotInstance = mdl.isbot as ReturnType<typeof createIsbot>;
		});
		afterAll(() => {
			jest.restoreAllMocks();
		});
		test("fallback regex detects commong crawlers", () => {
			USER_AGENT_COMMON.forEach((ua) => {
				if (!isbotInstance(ua)) {
					throw new Error(`Failed to detect ${ua} as bot`);
				}
			});
		});
		test("fallback detects gotchas as bots", () => {
			USER_AGENT_GOTCHAS.forEach((ua) => {
				if (!isbotInstance(ua)) {
					throw new Error(`Failed to detect ${ua} as bot (gotcha)`);
				}
			});
		});
		test("fallback does not detect browser as bot", () => {
			expect(isbotInstance(BROWSER_USER_AGENT_EXAMPLE)).toBe(false);
		});
	});

	describe("fixtures", () => {
		test(`✔︎ ${crawlers.length} user agent string should be recognised as crawler`, () => {
			let successCount = 0;
			let misidentifiedStrings: string[] = [];
			crawlers.forEach((crawler) => {
				if (isbot(crawler)) {
					successCount++;
				} else {
					misidentifiedStrings.push(crawler);
				}
			});
			expect(misidentifiedStrings).toEqual([]);
			expect(successCount).toBe(crawlers.length);
		});
		test(`✘ ${browsers.length} user agent string should not be recognised as crawler`, () => {
			let successCount = 0;
			let misidentifiedStrings: string[] = [];
			browsers.forEach((browser) => {
				if (isbot(browser)) {
					misidentifiedStrings.push(browser);
				} else {
					successCount++;
				}
			});
			expect(misidentifiedStrings).toEqual([]);
			expect(successCount).toBe(browsers.length);
		});
	});

	describe("module interface", () => {
		test("interface is as expected", async () => {
			const types = Object.entries(await import("../../src/index")).map(
				([key, value]) => [key, value.constructor.name] as [string, string],
			);
			expect(types).toMatchSnapshot();
		});
		test("regular expressions exports are as expected", () => {
			expect(new RegExp(fullPattern, "i").toString()).toBe(
				getPattern().toString(),
			);
		});
	});
});
