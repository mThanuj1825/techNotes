const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
	// option for setting origins
	origin: (origin, callback) => {
		// if it is a valid origin or even no origin (like POSTMAN), it is valid
		console.log("Origin:", origin);
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			// callback(ERROR OBJECT, ALLOWED)
			callback(null, true);
		} else {
			// callback(ERROR OBJECT, ALLOWED)
			callback(new Error("Not allowed by CORS"), false);
		}
	},
	// Using this we can include the credentials in the headers for session managements
	credentials: true,
	// The default status for success is 204, but it may cause errors on some devices like smart TVs and old browsers.
	// // So, we overwrite it to 200
	optionsSuccessStatus: 200,
};

module.exports = corsOptions;