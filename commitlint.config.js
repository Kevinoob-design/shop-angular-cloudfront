module.exports = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"header-max-length": [2, "always", 72],
		"header-case": [2, "always", "lower-case"],
		"body-leading-blank": [2, "always"],
		"body-empty": [2, "never"],
		"body-min-length": [2, "always", 40],
		"body-case": [2, "always", "lower-case"],
		"trailer-exists": [2, "always", "module:"],
		"scope-case": [2, "always", "lower-case"]
	}
}
