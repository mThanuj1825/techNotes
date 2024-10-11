// import express
const express = require("express");
// import path
const path = require("path");

// create a Router instance to route user to various pages and apis
const router = express.Router();

// GET request to get the index.html page
// "/" or "/index" or "/index.html"
router.get("^/$|/index(.html)?", (req, res) => {
	// send an already present index.html file from the views folder to the client
	res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;