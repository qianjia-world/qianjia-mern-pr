const express = require("express")
const usersControllers = require("../controllers/users-controllers")
const router = express.Router()
const { getAuth, checkAuthSelfOrAdmin } = require("../middleware/check-auth")

router.get("/", usersControllers.getUsers)
router.get("/:id", getAuth, usersControllers.getUserDetail)

router.post("/", usersControllers.signup)
router.post("/login", usersControllers.login)
router.post("/logout", usersControllers.logout)

router.patch("/:id", checkAuthSelfOrAdmin, usersControllers.patchUserDetail)

module.exports = router
