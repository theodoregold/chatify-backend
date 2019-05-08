const WebSocket = require("ws");

const connectionController = require("../controllers/connection");

const socket = require("../helpers/socket");
const logger = require("../helpers/logger");
const broadcaster = require("../helpers/broadcaster");

const redis = require("../services/redis");



const verifyClient = async (info, next) => {
	// we could also use cookies (httpOnly?)
	const token = info.req.headers["sec-websocket-protocol"];

	try {
		if (!token || typeof token !== "string") return next(false, 401);

		const nickname = await redis.get(token);

		// in an actual auth scenario we could do
		// access token (like jwt) verification
		if (nickname) return next(false, 401);

		// in this case token is also nickname
		info.req.user = {
			nickname: token,
		};

		logger.info("user %s verification", token);

		next(true);
	} catch (err) {
		logger.error(err, "error in socket handshake");
		next(false, 401);
	}
};

const connection = (server) => async (connection, req) => {
	const {user} = req;

	await redis.set(user.nickname, new Date().toString());

	// setup idle timeout
	connection.idle = socket.timeout(connection, user);

	// info user joined
	broadcaster.server(`${user.nickname} joined`, server, connection);

	connection.on("message", connectionController.message(server, connection, user));
	connection.on("close", connectionController.close(server, connection, user));
};

const close = () => {
	logger.info("WebSocket disconnected");
};

module.exports = (server) => {
	const wss = new WebSocket.Server({
		server,
		maxPayload: 1024,
		verifyClient,
	});

	wss.on("connection", connection(wss));
	wss.on("close", close);

	return wss;
};
