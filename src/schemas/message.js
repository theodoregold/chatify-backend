module.exports = {
	user: {
		message: {
			presence: true,
			length: {
				maximum: 240,
				message: "must be shorter than 240 characters",
			},
		},
	},
};
