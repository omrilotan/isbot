const {
	name,
	description,
	version,
	repository: { url: repositoryUrl },
} = require("./package.json");

module.exports = {
	locals: {
		packageFullName: [name, version].join("@"),
		description,
		repositoryUrl: repositoryUrl.replace(/^git\+/, "").replace(/\.git$/, ""),
	},
};
