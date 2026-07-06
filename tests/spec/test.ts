import {
	createIsbot,
	createIsBot,
	createIsbotFromList,
	createIsBotFromList,
	findBotMatch,
	findBotMatches,
	findBotPattern,
	findBotPatterns,
	getPattern,
	isbot,
	isBot,
	isbotMatch,
	isbotMatches,
	isbotNaive,
	isBotNaive,
	isbotPattern,
	isbotPatterns,
	list,
} from "../../src";
import { readFile } from "node:fs/promises";
import { fullPattern } from "../../src/pattern";
import { crawlers, browsers } from "../../fixtures";
let isBotInstance: any;

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

describe("isBot", () => {
	describe("features", () => {
		test("pattern: pattern is a regex", () => {
			expect(getPattern()).toBeInstanceOf(RegExp);
		});
		test("list: list is an array", () => {
			expect(list).toBeInstanceOf(Array);
			expect(list.every((item) => typeof item === "string")).toBe(true);
		});
		test("isBot: bot user agent string is recognised as bot", () => {
			expect(isBot(BOT_USER_AGENT_EXAMPLE)).toBe(true);
		});
		test("findBotMatch: find pattern in bot user agent string", () => {
			expect(findBotMatch(BOT_USER_AGENT_EXAMPLE)).toBe("Google");
		});
		test("findBotMatches: find all patterns in bot user agent string", () => {
			expect(findBotMatches(BOT_USER_AGENT_EXAMPLE)).toContain("Google");
			expect(findBotMatches(BOT_USER_AGENT_EXAMPLE)).toHaveLength(4);
		});
		test("findBotPattern: find first pattern in bot user agent string", () => {
			expect(findBotPattern(BOT_USER_AGENT_EXAMPLE)).toMatchSnapshot();
		});
		test("findBotPatterns: find all patterns in bot user agent string", () => {
			expect(findBotPatterns(BOT_USER_AGENT_EXAMPLE)).toHaveLength(4);
		});
		test("createIsBot: create custom isBot function with custom pattern", () => {
			const customIsBot = createIsBot(/bot/i);
			expect(customIsBot(BOT_USER_AGENT_EXAMPLE)).toBe(true);
		});
		test("createIsBotFromList: create custom isBot function with custom pattern", () => {
			const ChromeLighthouseUserAgentStrings: string[] = [
				"mozilla/5.0 (macintosh; intel mac os x 10_15_7) applewebkit/537.36 (khtml, like gecko) chrome/94.0.4590.2 safari/537.36 chrome-lighthouse",
				"mozilla/5.0 (linux; android 7.0; moto g (4)) applewebkit/537.36 (khtml, like gecko) chrome/94.0.4590.2 mobile safari/537.36 chrome-lighthouse",
			];
			const patternsToRemove: Set<string> = new Set(
				ChromeLighthouseUserAgentStrings.map(findBotPatterns).flat(),
			);
			const isBot2 = createIsBotFromList(
				list.filter(
					(record: string): boolean => patternsToRemove.has(record) === false,
				),
			);
			const [ua] = ChromeLighthouseUserAgentStrings;
			expect(isBot(ua)).toBe(true);
			expect(isBot2(ua)).toBe(false);
		});
		test.each([null, undefined, ""])(
			"all functions can accept %p",
			(value: string | null | undefined) => {
				expect(isBot(value)).toBe(false);
				expect(findBotMatch(value)).toBe(null);
				expect(findBotMatches(value)).toEqual([]);
				expect(findBotPattern(value)).toBe(null);
				expect(findBotPatterns(value)).toEqual([]);
			},
		);
	});

	describe("isBotNaive", () => {
		test.each([75])(
			"a large number of user agent strings can be detected (>%s%)",
			(percent) => {
				const ratio =
					crawlers.filter((ua) => isBotNaive(ua)).length / crawlers.length;
				expect(ratio).toBeLessThan(1);
				expect(ratio).toBeGreaterThan(percent / 100);
			},
		);
		test.each([1])(
			"a small number of browsers is falsly detected as bots (<%s%)",
			(percent) => {
				const ratio =
					browsers.filter((ua) => isBotNaive(ua)).length / browsers.length;
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
			isBotInstance = mdl.isBot as ReturnType<typeof createIsBot>;
		});
		afterAll(() => {
			jest.restoreAllMocks();
		});
		test("fallback regex detects commong crawlers", () => {
			USER_AGENT_COMMON.forEach((ua) => {
				if (!isBotInstance(ua)) {
					throw new Error(`Failed to detect ${ua} as bot`);
				}
			});
		});
		test("fallback detects gotchas as bots", () => {
			USER_AGENT_GOTCHAS.forEach((ua) => {
				if (!isBotInstance(ua)) {
					throw new Error(`Failed to detect ${ua} as bot (gotcha)`);
				}
			});
		});
		test("fallback does not detect browser as bot", () => {
			expect(isBotInstance(BROWSER_USER_AGENT_EXAMPLE)).toBe(false);
		});
	});

	describe("fixtures", () => {
		test(`✔︎ ${crawlers.length} user agent string should be recognised as crawler`, () => {
			let successCount = 0;
			let misidentifiedStrings: string[] = [];
			crawlers.forEach((crawler) => {
				if (isBot(crawler)) {
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
				if (isBot(browser)) {
					misidentifiedStrings.push(browser);
				} else {
					successCount++;
				}
			});
			expect(misidentifiedStrings).toEqual([]);
			expect(successCount).toBe(browsers.length);
		});
	});

	describe("aliases", () => {
		test.each([
			[isbot, isBot],
			[isbotNaive, isBotNaive],
			[createIsbot, createIsBot],
			[createIsbotFromList, createIsBotFromList],
			[isbotMatch, findBotMatch],
			[isbotMatches, findBotMatches],
			[isbotPattern, findBotPattern],
			[isbotPatterns, findBotPatterns],
		])("alias %p is the same as %p", (alias, original) => {
			expect(alias).toBe(original);
		});

		test.each(["index.d.ts", "index.d.mts"])(
			"TypeScript descriptions match for aliases in %s",
			async (fileName) => {
				const declarations = await readFile(fileName, "utf8");
				const descriptions = new Map(
					Array.from(
						declarations.matchAll(
							/\/\*\*\s*\n((?:\s*\*.*\n)+)\s*\*\/\s+declare (?:function|const) (\w+)\b/g,
						),
					).map(([, description, name]) => [
						name,
						description
							.split("\n")
							.map((line) => line.replace(/^\s*\*\s?/, "").trimEnd())
							.join(" ")
							.trim(),
					]),
				);
				const getDescription = (name: string): string => {
					return descriptions.get(name) ?? "";
				};
				[
					["isbot", "isBot"],
					["isbotNaive", "isBotNaive"],
					["createIsbot", "createIsBot"],
					["createIsbotFromList", "createIsBotFromList"],
					["isbotMatch", "findBotMatch"],
					["isbotMatches", "findBotMatches"],
					["isbotPattern", "findBotPattern"],
					["isbotPatterns", "findBotPatterns"],
				].forEach(([alias, original]) => {
					const originalDescription = getDescription(original);
					expect(originalDescription).not.toBe("");
					expect(getDescription(alias)).toBe(originalDescription);
				});
			},
		);
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
