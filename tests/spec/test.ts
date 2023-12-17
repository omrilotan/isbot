import {
	isbot,
	isbotMatch,
	isbotMatches,
	isbotPattern,
	isbotPatterns,
	createIsbot,
} from "../../src";
import { crawlers, browsers } from "../../fixtures";

const BOT_USER_AGENT_EXAMPLE =
	"Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const BROWSER_USER_AGENT_EXAMPLE =
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91 Safari/537.36";

describe("isbot", () => {
	describe("features", () => {
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
