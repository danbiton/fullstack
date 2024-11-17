const {signUp,signIn,signOut,validationEmail} = require ("../controllers/user.controller")
const express = require("express")

const router = express.Router()

router.post("/signup",signUp)
router.post("/signin",signIn)
router.get("/signout",signOut)
router.get("/validationEmail/:id", validationEmail);

module.exports = router;