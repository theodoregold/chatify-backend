const socket = require("./socket");
const logger = require("./logger");


exports.server = (body, server, connection) => {
	const message = socket.format({
		type: "info",
		body,
	});

	logger.info(message, "broadcast server message");
	socket.broadcast(server, message, connection);
};

exports.user = (body, user, server, connection) => {
	const message = socket.format({
		body,
		nickname: user.nickname,
	});

	logger.info(message, "broadcast user message");
	socket.broadcast(server, message, connection);
};
