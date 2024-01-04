import {
	pattern,
	list,
	isbot,
	isbotMatch,
	isbotMatches,
	isbotPattern,
	isbotPatterns,
	createIsbot,
	createIsbotFromList,
} from "../../src";
import { crawlers, browsers } from "../../fixtures";

const BOT_USER_AGENT_EXAMPLE =
	"Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const BROWSER_USER_AGENT_EXAMPLE =
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91 Safari/537.36";

describe("isbot", () => {
	describe("features", () => {
		test("pattern: pattern is a regex", () => {
			expect(pattern).toBeInstanceOf(RegExp);
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
			expect(isbotMatches(BOT_USER_AGENT_EXAMPLE)).toHaveLength(3);
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
			expect(isbotPatterns(BOT_USER_AGENT_EXAMPLE)).toHaveLength(3);
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
});
