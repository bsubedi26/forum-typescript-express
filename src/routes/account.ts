import { Router } from 'express';
import * as UserController from "../controllers/user";
import * as passportConfig from "../config/passport";

const router = Router();

/**
 * Authenticated routes.
 */
router.get("/", passportConfig.isAuthenticated, UserController.getAccount);
router.post("/profile", passportConfig.isAuthenticated, UserController.postUpdateProfile);
router.post("/password", passportConfig.isAuthenticated, UserController.postUpdatePassword);
router.post("/delete", passportConfig.isAuthenticated, UserController.postDeleteAccount);
router.get("/unlink/:provider", passportConfig.isAuthenticated, UserController.getOauthUnlink);

export default router;