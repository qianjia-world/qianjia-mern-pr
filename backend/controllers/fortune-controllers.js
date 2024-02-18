const fortuneItem = require("../models/vote")
const HttpError = require("../models/http-error")

const getTypes = async (req, res, next) => {}
const getResult = async (req, res, next) => {}
const getTypeItems = async (req, res, next) => {}
// const postTypes = async (req, res, next) => {}
const postTypeItem = async (req, res, next) => {}
const patchTypeItem = async (req, res, next) => {}
const deleteTypeItem = async (req, res, next) => {}

exports.getTypes = getTypes
exports.getResult = getResult
exports.getTypeItems = getTypeItems
// exports.postTypes = postTypes
exports.postTypeItem = postTypeItem
exports.patchTypeItem = patchTypeItem
exports.deleteTypeItem = deleteTypeItem
