const bcrypt = require("bcryptjs");

const logger = require("../helpers/logger");



exports.hash = async (field) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(field, salt);

		return hash;
	} catch (error) {
		logger.error(error, "hash error");
		throw new Error(error);
	}
};

exports.compare = async (prev, next) => {
	try {
		return await bcrypt.compare(prev, next);
	} catch (error) {
		logger.error(error, "compare error");
		throw new Error(error);
	}
};
