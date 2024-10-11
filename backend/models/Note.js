const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const noteSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	title: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	completed: {
		type: Boolean,
		required: false,
	},
}, {
	// these are additional options for the schema
	// // timestamps include dateCreated and dateModified
	timeStamps: true,
});

// used to include plugins or modules into the schema
noteSchema.plugin(AutoIncrement, {
	// renames the increment field from _id to ticket
	inc_field: "ticket",
	// creates a new collection with the name counter to keep track of all the sequencing
	id: "ticketNums",
	// starting number is from 500
	start_seq: 500,
});

module.exports = mongoose.model("Note", noteSchema);