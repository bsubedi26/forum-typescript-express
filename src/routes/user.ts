import { Router } from 'express';
import * as UserController from "../controllers/user";

const router = Router();

router.get('/', UserController.findUsers);
router.get("/login", UserController.getLogin);
router.post("/login", UserController.postLogin);
router.get("/logout", UserController.logout);
router.get("/forgot", UserController.getForgot);
router.post("/forgot", UserController.postForgot);
router.get("/reset/:token", UserController.getReset);
router.post("/reset/:token", UserController.postReset);
router.get("/signup", UserController.getSignup);
router.post("/signup", UserController.postSignup);

export default router;

// app.get("/users", userController.findUsers);
// app.get("/login", userController.getLogin);
// app.post("/login", userController.postLogin);
// app.get("/logout", userController.logout);
// app.get("/forgot", userController.getForgot);
// app.post("/forgot", userController.postForgot);
// app.get("/reset/:token", userController.getReset);
// app.post("/reset/:token", userController.postReset);
// app.get("/signup", userController.getSignup);
// app.post("/signup", userController.postSignup);
