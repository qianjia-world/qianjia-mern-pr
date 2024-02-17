const express = require("express")
const usersControllers = require("../controllers/users-controllers")
const router = express.Router()

// router.get("/", usersControllers.getUsers)
// router.get("/test", async (req, res, next) => {
// 	res.json({ message: "Test" })
// })

router.get("/", usersControllers.getUsers)
router.get("/:id", usersControllers.getUserDetail)

router.post("/", usersControllers.signup)
router.post("/login", usersControllers.login)
router.post("/logout", usersControllers.logout)

router.patch("/:id", usersControllers.putUserDetail)

module.exports = router
