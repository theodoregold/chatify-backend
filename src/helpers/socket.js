const uuid = require('uuid/v4');
const WebSocket = require("ws");

const logger = require("../helpers/logger");

const CONFIG = require("../../env");



exports.broadcast = (wss, data, current) => {
	const message = JSON.stringify(data);

	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(message);
		}
	});
};

exports.format = (message) => {
	const id = uuid();
	const date = new Date();

	return {
		id,
		created: date,
		...message,
	};
};

exports.timeout = (next, duration) => {
	let timeout = setTimeout(next, duration);

	this.reset = () => {
		clearTimeout(timeout);

		timeout = setTimeout(next, duration);
	};

	return this;
};


exports.timeout = (connection, user) => {
	const close = () => {
		// websocket 4XXX codes are for useable for apps + 408 from HTTP
		connection.close(4408);
		logger.info("user %s kicked for idling", user.nickname);
	};


	let timeout = setTimeout(close, CONFIG.socket.timeout);

	this.reset = () => {
		clearTimeout(timeout);

		timeout = setTimeout(close, CONFIG.socket.timeout);
	};

	return this;
};
