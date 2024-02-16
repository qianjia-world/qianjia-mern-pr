const express = require("express")
const usersControllers = require("../controllers/users-controllers")
const router = express.Router()

router.get("/", usersControllers.getUsers)
router.get("/test", async (req, res, next) => {
	res.json({ message: "Test" })
})
module.exports = router
