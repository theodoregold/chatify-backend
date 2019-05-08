const logger = require("../helpers/logger");

const errorAuth = require("../errors/auth");

const redis = require("../services/redis");



// might as well be called "check"
exports.signup = async (req, res, next) => {
	const {
		nickname,
	} = req.body;

	try {
		const user = await redis.get(nickname);

		if (user) {
			return res.status(400).json({
				errors: {
					inputs: {
						nickname: [errorAuth.NICKNAME_EXISTS],
					},
				},
			});
		}

		// we don't have any persistant user or auth mechanism
		// in this case nickname is the token
		return res.json({
			nickname,
			token: nickname,
		});
	} catch (err) {
		logger.error(err, "auth register");
		next(err);
	}
};
