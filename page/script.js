import { isbot, isbotMatch, isbotPattern } from "..";

{
	const textarea = document.querySelector("textarea");
	const output = document.querySelector("output");
	const copyLink = document.querySelector('[id="copy-link"]');
	let timer;

	const url = new URL(window.location.href);
	const ua = url.searchParams.get("ua");

	textarea.childNodes.forEach((child) => child.parentNode?.removeChild(child));
	textarea.appendChild(document.createTextNode(ua || navigator.userAgent));
	textarea.addEventListener("keyup", change);
	textarea.addEventListener("paste", change);
	textarea.addEventListener("focus", () => textarea.select());
	check();

	function change({ target: { value } }) {
		clearTimeout(timer);
		timer = setTimeout(check, 200, value);
	}

	function append(parent, tag, string) {
		if (tag) {
			const ele = document.createElement("kbd");
			ele.appendChild(document.createTextNode(string));
			parent.appendChild(ele);
		} else {
			parent.appendChild(document.createTextNode(string));
		}
	}

	function details(ua) {
		const fragment = document.createDocumentFragment();
		const is = isbot(ua);
		const found = is && isbotMatch(ua);
		const pattern = is && isbotPattern(ua);

		if (is) {
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

	function check(value = textarea.innerHTML) {
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

	copyLink.addEventListener("click", (event) => {
		event.preventDefault();
		const { protocol, host, pathname } = document.location;
		navigator.clipboard.writeText(
			[
				protocol,
				"//",
				host,
				pathname,
				"?ua=",
				encodeURIComponent(textarea.value),
			].join(""),
		);
		const dialog = document.createElement("dialog");
		dialog.appendChild(document.createTextNode("copied to clipboard"));
		document.body.appendChild(dialog);
		dialog.showModal();
		setTimeout(() => {
			dialog.addEventListener("transitionend", () => {
				dialog.close();
				document.body.removeChild(dialog);
			});
			dialog.style.opacity = 0;
		}, 1000);
	});
}
