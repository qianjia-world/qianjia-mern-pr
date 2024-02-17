const express = require("express")
const votesControllers = require("../controllers/votes-controllers")
const fortuneControllers = require("../controllers/fortune-controllers")
const router = express.Router()

router.get("/", (req, res, next) => {})

// 投票功能
router.get("/votes", votesControllers.getVotes)
router.post("/votes", votesControllers.postVote)
router.patch("/votes/:id", votesControllers.putVote)
router.delete("/votes/:id", votesControllers.deleteVote)

// 占卜、工程師幹話、名言、脫離PUA
router.get("/fortune/types", fortuneControllers.getTypes)
router.get("/fortune/:types/result", fortuneControllers.getResult)
router.get("/fortune/:types", fortuneControllers.getTypeItems)
// router.post("/fortune", fortuneControllers.postTypes)
router.post("/fortune/:types", fortuneControllers.postTypeItem)
router.patch("/fortune/:types/:id", fortuneControllers.putTypeItem)
router.delete("/fortune/:types/:id", fortuneControllers.deleteTypeItem)

//websocket
module.exports = router
