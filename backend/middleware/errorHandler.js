const { logEvents } = require("./logger");

// create a function that handles all the errors we face in the server
// // this overwrites the default error handling system for the server
const errorHandler = async (err, req, res, next) => {
	// logs the current error to the errLog.log file
	await logEvents(`${ err.name }: ${ err.message }\t${ req.method }\t${ req.url }\t${ req.headers.origin }`, `errLog.log`);
	console.log(err.stack);
	
	const status = res.statusCode ? res.statusCode : 500; // server error
	
	res.status(status);
	
	res.json({
		message: err.message,
	});
};

module.exports = errorHandler;