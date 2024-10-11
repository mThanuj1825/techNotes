// import express 
const express = require("express");
// import path
const path = require("path");

// create an object for express
const app = express();
// create a PORT for the server to run on
// // process.env is used to access the environment variables
const PORT = process.env.PORT || 3000;

// lets our app recieve, process and send json
app.use(express.json());

// declares where to look for the static files on our backend using a middleware called express.static
// // files like, css, html etc.
app.use("/", express.static(path.join(__dirname, "public")));

// root routes
app.use("/", require("./routes/root"));

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

// starts listening for requests from everywhere
app.listen(PORT, () => {
	console.log(`Server running on port ${ PORT }`);
});