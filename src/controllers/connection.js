const MessageSchema = require("../schemas/message");

const validator = require("../helpers/validator");
const logger = require("../helpers/logger");
const broadcaster = require("../helpers/broadcaster");

const redis = require("../services/redis");



exports.message = (server, connection, user) => async (message) => {
	connection.idle.reset();

	try {
		const data = JSON.parse(message);

		logger.info(data, "received message");

		validator.all(MessageSchema);

		const errors = await validator.all(data, MessageSchema.user);

		if (errors) throw new Error(errors);

		// user message
		broadcaster.user(data.message, user, server, connection);
	} catch (error) {
		logger.error(error, "error on receiving message");
	}
};

exports.close = (server, connection, user) => async (code) => {
	try {
		await redis.del(user.nickname);

		// websocket 4XXX codes are for useable for apps + 408 from HTTP
		const reason = (code === 4408 ? "kicked for idling" : "left");

		// info user left
		broadcaster.server(`${user.nickname} ${reason}`, server, connection);
	} catch (error) {
		logger.error(error, "error on closing connection");
	}
};
