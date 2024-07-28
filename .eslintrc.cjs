module.exports = {
	parserOptions: {
		ecmaVersion: 2022,
		sourceType: "module"
	},
	env: {
		browser: true,
		es2022: true
	},
	extends: "airbnb-base",
	rules: process.argv.includes("--mode=production") ?
		{
			"import/extensions": 0,
			"import/prefer-default-export": 0,
			"import/newline-after-import": 0,
			"no-tabs": 0,
			"no-console": 0
		} :
		{
			"import/extensions": 0,
			"import/prefer-default-export": 0,
			"import/newline-after-import": 0,
			"no-tabs": 0,
			"no-console": 0,
			'import/no-unresolved': 0,
			'semi': 0,
			'indent': 0,
			'no-multiple-empty-lines': 0,
			'no-trailing-spaces': 0,
			'no-multi-spaces': 0,
			'linebreak-style': 0,
			'no-unused-vars': 0,
			'padded-blocks': 0,
			'quotes': 0
		},
	settings: {
		"import/resolver": {
			alias: {
				map: [
					["@scripts", "./src/scripts"]
				],
				extensions: [".js", ".ts"]
			}
		}
	}
}

