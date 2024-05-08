const LogoutController = (req, res) => {
	res.clearCookie('access-token');
	res.clearCookie('user');

	return res.json('Wylogowano użytkownika');
};

module.exports = LogoutController;
