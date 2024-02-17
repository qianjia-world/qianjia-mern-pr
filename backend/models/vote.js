const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const Schema = mongoose.Schema

const voteSchema = new Schema({})

voteSchema.plugin(uniqueValidator)
module.exports = mongoose.model("Vote", voteSchema)
