const { sign, verify } = require('jsonwebtoken');

const createTokens = user => {
	const accessToken = sign({ nickname: user.nickname, id: user._id }, process.env.JWT_SECRET);

	return accessToken;
};

const validateToken = (req, res, next) => {
	const accessToken = req.cookies['access-token'];

	if (!accessToken) {
		return res.status(403).json('Użytkownik nie jest zalogowany');
	}

	try {
		const validToken = verify(accessToken, process.env.JWT_SECRET);

		if (validToken) {
			req.authenticated = true;
			return next();
		}
	} catch (ex) {
		return res.status(400).json({ error: ex });
	}
};

module.exports = { createTokens, validateToken };
