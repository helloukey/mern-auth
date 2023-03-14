const express = require("express");
const router = express.Router();
const myController = require("../controllers/myController");
const { requireAuth, pageAuth } = require("../middleware/authMiddleware");

router.get("/", myController.checkGET)
router.post("/register", myController.registerPOST)
router.post("/login", myController.loginPOST)
router.get("/check-user", myController.checkUserGET)
router.get("/logout", requireAuth, myController.logout)
router.post("/reset-password", myController.resetPassword)

module.exports = router;