const jwt = require("jsonwebtoken");
const uuid = require("uuid/v4");

const CONFIG = require("../../env");



const TOKEN_EXPIRATION = 60 * 5; // 5 minutes in seconds
// const TOKEN_EXPIRATION = 10; // 10 seconds

const combine = (secret) => {
	// token secret = server secret + server seperator + user secret
	return CONFIG.jwt.secret + CONFIG.jwt.seperator + secret;
};

exports.sign = async (session) => {
	// generate random string for token id
	const jti = uuid();

	const now = Math.floor(Date.now() / 1000);

	const iat = now;
	const exp = now + TOKEN_EXPIRATION;

	return jwt.sign({
		sid: session.id,
		nickname: session.nickname,
		jti,
		iat,
		exp,
	}, combine(jti), {
		algorithm: CONFIG.jwt.algorithm,
	});
};

exports.verify = async (token, user) => {
	const decoded = jwt.decode(token);

	return jwt.verify(token, combine(decoded.jti), {
		algorithm: CONFIG.jwt.algorithm,
	});
};
