module.exports = {
	signup: {
		nickname: {
			presence: true,
			length: {
				minimum: 2,
				maximum: 16,
				message: "must be between 2 and 16 characters",
			},
		},
	},
};
