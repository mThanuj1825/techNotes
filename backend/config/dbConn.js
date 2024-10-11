const mongoose = require("mongoose");

// connects to the database
const connectDB = async () => {
	try {
		// connect to the mongoose uri mentioned in the environment variables
		await mongoose.connect(process.env.DATABASE_URI);
	} catch (err) {
		console.log(err);
	}
};

module.exports = connectDB;