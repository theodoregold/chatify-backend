const uuid = require('uuid/v4');

const cryptoHelper = require('../helpers/crypto');



const REFRESH_DURATION = 60 * 60 * 24 * 31 * 6; // 2 weeks
const LOGIN_DURATION = 60 * 60 * 24 * 31 * 6; // 6 months

exports.validate = async (session, refresh) => {
	const now = (Math.floor(Date.now() / 1000));

	if (!session ||
		session.active ||
		session.refreshToken.expired < now ||
		(now - session.created > LOGIN_DURATION)) {
		return false;
	}

	const match = await cryptoHelper.compare(refresh, session.refreshToken.hash);

	return match;
};

exports.createRefresh = async () => {
	const token = uuid();
	const now = (Math.floor(Date.now() / 1000));

	const hash = await cryptoHelper.hash(token);

	return {
		token,
		hash,
		expired: (now + REFRESH_DURATION),
	};
};
