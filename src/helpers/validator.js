const validator = require("validate.js");



validator.validators.type = (value, options, key, attributes) => {
	if (typeof value === options.type) return null;

	return options.message || "field is in invalid type";
};

validator.validators.id = (value, options, key, attributes) => {
	if (typeof value === "string" && value.match(/^[0-9a-fA-F]{24}$/)) return null;

	return options.message || "is invalid id";
};

module.exports = {
	all(form, schema) {
		const copy = {
			...form,
		};

		// remove strings with length 0
		Object.keys(copy).forEach((key) => {
			if (typeof copy[key] === "string" && copy[key].length === 0) delete copy[key];
		});

		return validator.validate(copy, schema);
	},
};
