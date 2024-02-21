const express = require("express")
const router = express.Router()
const { check, oneOf } = require("express-validator")

const { nextValidatorError } = require("../middleware/next-validator-error")
const { checkAuthAdmin } = require("../middleware/check-auth")

const functionsControllers = require("../controllers/functions-controllers")
const votesControllers = require("../controllers/votes-controllers")
const fortuneControllers = require("../controllers/fortune-controllers")

router.get("/", functionsControllers.getFunctions)

// 投票功能
router.get("/votes", votesControllers.getVotes)
router.post("/votes", checkAuthAdmin, votesControllers.postVote)
router.patch("/votes/:id", checkAuthAdmin, votesControllers.patchVote)
router.delete("/votes/:id", checkAuthAdmin, votesControllers.deleteVote)

// 占卜、工程師幹話、名言、脫離PUA
router.get("/fortunes", fortuneControllers.getTypes)
router.get(
	"/fortunes/:type/result",
	[
		check("type")
			.trim()
			.notEmpty()
			.withMessage("Types con not set empty value")
	],
	nextValidatorError,
	fortuneControllers.getResult
)
router.get(
	"/fortunes/:type",
	checkAuthAdmin,
	[
		check("type")
			.trim()
			.notEmpty()
			.withMessage("Types con not set empty value")
	],
	nextValidatorError,
	fortuneControllers.getTypeItems
)

router.post(
	"/fortunes",
	checkAuthAdmin,
	[
		check("type")
			.trim()
			.notEmpty()
			.withMessage("type con not set empty value"),
		check("name")
			.trim()
			.notEmpty()
			.withMessage("Name con not set empty value")
	],
	nextValidatorError,
	fortuneControllers.postTypes
)
router.post(
	"/fortunes/:type",
	checkAuthAdmin,
	[
		check("type")
			.trim()
			.notEmpty()
			.withMessage("type con not set empty value"),
		check("image").optional(),
		check("result").notEmpty()
	],
	nextValidatorError,
	fortuneControllers.postTypeItem
)

router.patch(
	"/fortunes/:type/:id",
	checkAuthAdmin,
	oneOf([check("image").notEmpty(), check("result").notEmpty()], {
		message: "Both the image and the result cannot be empty"
	}),
	[
		(check("type")
			.trim()
			.notEmpty()
			.withMessage("type con not set empty value"),
		check("id").trim().notEmpty().withMessage("id con not set empty value"),
		check("image").optional().notEmpty(),
		check("result").optional().notEmpty())
	],
	nextValidatorError,
	fortuneControllers.patchTypeItem
)

router.delete(
	"/fortunes/:type/:id",
	checkAuthAdmin,
	[
		(check("type")
			.trim()
			.notEmpty()
			.withMessage("type con not set empty value"),
		check("id").trim().notEmpty().withMessage("id con not set empty value"))
	],
	nextValidatorError,
	fortuneControllers.deleteTypeItem
)

//websocket
module.exports = router
