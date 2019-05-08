module.exports = {
	host: "chatify-app.herokuapp.com",
	port: process.env.PORT,

	redis: process.env.REDIS_URL,

	socket: {
		timeout: 1000 * 60 * 5, // 5 minutes
	},
};
