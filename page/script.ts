import { isbot, isbotMatch, isbotPatterns, getPattern } from "..";

{
	const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
	const output = document.querySelector("output") as HTMLOutputElement;
	const code = document.querySelector("pre code") as HTMLElement;
	const copyLink = document.querySelector(
		'[id="copy-link"]',
	) as HTMLButtonElement;
	let timer: ReturnType<typeof setTimeout>;

	const url = new URL(window.location.href);
	const ua = url.searchParams.get("ua");

	textarea.childNodes.forEach((child) => child.parentNode?.removeChild(child));
	textarea.appendChild(document.createTextNode(ua || navigator.userAgent));
	textarea.addEventListener("keyup", change);
	textarea.addEventListener("paste", change);
	textarea.addEventListener("focus", () => textarea.select());
	check();

	function change({ target }: Event): void {
		const { value } = target as HTMLTextAreaElement;
		clearTimeout(timer);
		timer = setTimeout(check, 200, value);
	}

	function append(
		parent: DocumentFragment,
		tag: string | null,
		string: string | boolean | null,
	): void {
		if (tag) {
			const ele = document.createElement("kbd");
			ele.appendChild(document.createTextNode(`${string}`));
			parent.appendChild(ele);
		} else {
			parent.appendChild(document.createTextNode(`${string}`));
		}
	}

	function details(ua: string): DocumentFragment {
		const fragment = document.createDocumentFragment();
		const is = isbot(ua);

		if (is) {
			const found = isbotMatch(ua) as string;
			const patterns = isbotPatterns(ua);
			const pattern = patterns.find((pattern: string): boolean =>
				new RegExp(pattern, "i").test(found),
			) as string;
			console.log(patterns, pattern);
			append(fragment, null, "I think so, yes\n");
			append(fragment, null, "The substring ");
			append(fragment, "kbd", found);
			append(fragment, null, " matches the pattern ");
			append(fragment, "kbd", pattern);
		} else {
			append(
				fragment,
				null,
				"I don't think so, no\nI could not find a pattern I recognise",
			);
		}
		return fragment;
	}

	function check(value = textarea.innerHTML): void {
		value = value.trim();
		while (output.firstChild) {
			output.removeChild(output.firstChild);
		}
		if (value === "") {
			output.appendChild(
				document.createTextNode("Insert user agent string in the text box"),
			);
			return;
		}

		output.appendChild(details(value));
	}

	copyLink.addEventListener("click", (event: Event): void => {
		event.preventDefault();
		const { protocol, host, pathname } = document.location;
		copyToClipboard(
			[
				protocol,
				"//",
				host,
				pathname,
				"?ua=",
				encodeURIComponent(textarea.value),
			].join(""),
			"link copied to clipboard",
		);
	});

	code.appendChild(document.createTextNode(getPattern().toString()));
	code.style.userSelect = "all";
	code.addEventListener("click", (): void => {
		const range = document.createRange();
		range.selectNodeContents(code);
		const selection = window.getSelection();
		selection?.removeAllRanges();
		selection?.addRange(range);
		copyToClipboard(code.textContent || "", "pattern copied to clipboard");
	});

	function copyToClipboard(
		text: string,
		message = "copied to clipboard",
	): void {
		navigator.clipboard.writeText(text);
		const dialog = document.createElement("dialog");
		dialog.appendChild(document.createTextNode(message));
		document.body.appendChild(dialog);
		dialog.showModal();
		setTimeout((): void => {
			dialog.addEventListener("transitionend", () => {
				dialog.close();
				document.body.removeChild(dialog);
			});
			dialog.style.opacity = "0";
		}, 1000);
	}
}
