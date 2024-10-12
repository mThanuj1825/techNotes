const User = require("../models/User");
const Note = require("../models/Note");

// asyncHandler handles the errors in the async requests we get automatically
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc GET all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find().select("-password").lean();
	if (!users?.length) {
		// bad request
		return res.status(400).json({
			message: "No users found",
		});
	}
	
	res.json(users);
});

// @desc CREATE a user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
	const { username, password, roles } = req.body;
	
	// confirm data
	if (!username || !password || !Array.isArray(roles) || !roles.length) {
		// bad request
		return res.status(400).json({
			message: "All fields are required",
		});
	}
	
	// check for duplicates
	const duplicate = await User.findOne({ username }).select("-password").lean().exec();
	
	if (duplicate) {
		// conflict
		return res.status(409).json({
			message: "Duplicate username",
		});
	}
	
	// hash password
	const hashedPwd = await bcrypt.hash(password, 10);
	
	// new user object
	const userObject = { username, "password": hashedPwd, roles };
	
	// create and store new user
	const user = await User.create(userObject);
	
	if (user) {
		// created
		return res.status(201).json({
			message: `New user ${ username } created`,
		});
	}
	
	// bad request
	res.status(400).json({
		message: "Invalid user data received",
	});
});

// @desc UPDATE a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
	const { id, username, roles, active, password } = req.body;
	
	// confirm data
	if (!id || !username || !Array.isArray(roles) || !roles.length) {
		// bad request
		return res.status(400).json({
			message: "All fields are required",
		});
	}
	
	// get the user
	const user = await User.findById(id).exec();
	
	if (!user) {
		// bad request
		return res.status(400).json({
			message: "User not found",
		});
	}
	
	// check for duplicates
	const duplicate = await User.findOne({ username }).lean().exec();
	
	// allow updates to the original user
	if (duplicate && duplicate?._id.toString() !== id) {
		// conflict
		return res.status(409).json({
			message: "Duplicate username",
		});
	}
	
	user.username = username;
	user.roles = roles;
	user.active = active;
	
	if (password) {
		// hash password
		user.password = await bcrypt.hash(password, 10);
	}
	
	const updatedUser = await user.save();
	
	res.json({
		message: `${ updatedUser.username } updated`,
	});
});

// @desc DELETE a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
	const { id } = req.body;
	
	if (!id) {
		// bad request
		return res.status(400).json({
			message: "User ID required",
		});
	}
	
	const note = await Note.findOne({ user: id }).lean().exec();
	if (note) {
		// bad request
		return res.status(400).json({
			message: "User has assigned notes",
		});
	}
	
	const user = await User.findById(id).exec();
	
	if (!user) {
		// bad request
		return res.status(400).json({
			message: "User not found",
		});
	}
	
	const result = await User.findOneAndDelete({ _id: id });
	const reply = `Username ${ result.username } with ID ${ result._id } deleted`;
	
	res.json(reply);
});

module.exports = {
	getAllUsers, createNewUser, updateUser, deleteUser,
};