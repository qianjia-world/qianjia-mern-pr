const express = require("express")
const usersControllers = require("../controllers/users-controllers")
const router = express.Router()

router.get("/", usersControllers.getUsers)

module.exports = router
