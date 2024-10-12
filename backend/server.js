require("dotenv").config();
const express = require("express");
// create an object for express
const app = express();
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");

// create a PORT for the server to run on
// // process.env is used to access the environment variables
const PORT = process.env.PORT || 3000;

console.log(process.env.NODE_ENV);

// creates the database connection
connectDB();

// lets our app use the logger middleware we created
app.use(logger);

// lets our app recieve, process and send json
app.use(express.json());

// lets our app recieve, process and send cookies
app.use(cookieParser());

// lets our app recieve, process requests for anyone or the people we say okay
app.use(cors(corsOptions));

// declares where to look for the static files on our backend using a middleware called express.static
// // files like, css, html etc.
app.use("/", express.static(path.join(__dirname, "public")));

// root routes
app.use("/", require("./routes/root"));

// user routes
app.use("/users", require("./routes/userRoutes"));
// note routes
app.use("/notes", require("./routes/noteRoutes"));

// handle all the requests that are invalid or not being handled in the above part of the code
app.all("*", (req, res) => {
	// first set the resposne status to 404
	res.status(404);
	if (req.accepts("html")) {
		// if the request is an invalid html, send an html as response
		res.sendFile(path.join(__dirname, "views", "404.html"));
	} else if (req.accepts("json")) {
		// if the request is an invalid json, send a json as response 
		res.json({
			message: "404 Not Found",
		});
	} else {
		// if the request is anything other than html and json, send a text as response 
		res.type("txt").send("404 Not Found");
	}
});

// lets our app use the errorHandler middleware we created
app.use(errorHandler);

// starts listening for requests from everywhere
mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");
	app.listen(PORT, () => {
		console.log(`Server running on port ${ PORT }`);
	});
});

// starts listening for errors regarding our database 
mongoose.connection.on("error", async (err) => {
	console.log(err);
	await logEvents(`${ err.no }: ${ err.code }\t${ err.syscall }\t${ err.hostname }`, `mongoErrLog.log`);
});