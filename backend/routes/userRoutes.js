const express = require("express");
const usersController = require("../controllers/usersController");

// create a Router instance to route user to various pages and apis
const router = express.Router();

router.route("/")
	.get(usersController.getAllUsers)
	.post(usersController.createNewUser)
	.patch(usersController.updateUser)
	.delete(usersController.deleteUser);

module.exports = router;