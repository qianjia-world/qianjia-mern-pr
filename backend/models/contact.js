const mongoose = require("mongoose")

const Schema = mongoose.Schema

const contactSchema = new Schema({
	title: { type: String, required: true },
	email: { type: String, required: true },
	content: { type: String, required: true }
})

module.exports = mongoose.model("Contact", contactSchema)
