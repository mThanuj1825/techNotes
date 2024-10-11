const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// function to log the events or messages to a specific file
const logEvents = async (message, logFileName) => {
	// create a date variable
	const dateTime = `${ format(new Date(), "yyyyMMdd\tHH:mm:ss") }`;
	// generate a log item which we can use to put into a file
	// // use uuid() to generate a unique value everytime
	const logItem = `${ dateTime }\t${ uuid() }\t${ message }\n`;
	
	try {
		// check if the log directory exists
		if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
			// if the log directory does not exist, create it
			await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
		}
		
		// append to the provided logFile, if it is not present, it will automatically be created
		await fsPromises.appendFile(path.join(__dirname, "..", "logs", logFileName), logItem);
	} catch (err) {
		console.log(err);
	}
};

const logger = async (req, res, next) => {
	await logEvents(`${ req.method }\t${ req.url }\t${ req.headers.origin }`, `reqLog.log`);
	console.log(`${ req.method } ${ req.path }`);
	next();
};

module.exports = { logEvents, logger };