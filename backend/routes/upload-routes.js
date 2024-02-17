const express = require("express")
const uploadControllers = require("../controllers/upload-controllers")
const router = express.Router()

router.post("/img", uploadControllers.postImg)

module.exports = router
