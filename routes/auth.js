var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("firstName", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("encry_password", "password should be at least 3 char").isLength({ min: 3 })
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("encry_password", "password field is required").isLength({ min: 1 })
  ],
  signin
);

router.get("/signout", signout);
router.get("/testRoute", isSignedIn, (req, res)=>{
  res.send("A protected Route")
})

module.exports = router;
