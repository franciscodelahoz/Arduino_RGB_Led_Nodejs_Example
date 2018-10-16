const auth = require('basic-auth');
const admins = require('./users');

module.exports = function(request, response, next) {
	var user = auth(request);
	if (!user || !admins[user.name] || admins[user.name].password !== user.pass) {
		response.set('WWW-Authenticate', 'Basic realm="Secure Area"');
		return response.status(401).send('Access denied');
	}
	return next();
};
