import express from "express";
import { loginUser, logoutUser, refreshAccessToken, registeruser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registeruser,
);

router.route("/login").post(loginUser)

//secure route
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refreshToken").post(refreshAccessToken)




export default router;
