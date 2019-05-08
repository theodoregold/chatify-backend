const validator = require("../helpers/validator");



module.exports = (schema, params) => {
	return async (req, res, next) => {
		const {body} = req;

		try {
			const errors = await validator.all(body, schema);

			// continue if there are no errors
			if (!errors) return next();

			return res.status(400).json({
				errors: {
					inputs: errors,
				},
			});
		} catch (err) {
			console.log(err, "err validate");
			return next(err);
		}
	};
};
