module.exports = {
	error(message, status) {
		return {
			status: (status || 500),
			message,
		};
	},

	bad(message) {
		return {
			status: 400,
			message,
		};
	},

	unauthorized(message) {
		return {
			status: 401,
			message,
		};
	},

	forbidden(message) {
		return {
			status: 403,
			message,
		};
	},

	missing(message) {
		return {
			status: 404,
			message,
		};
	},
};
