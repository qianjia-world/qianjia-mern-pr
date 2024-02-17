const express = require("express")
const webControllers = require("../controllers/web-controllers")
const router = express.Router()

router.get("/info", webControllers.getInfo)
router.post("/contact", webControllers.postContact)

module.exports = router
