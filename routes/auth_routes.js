import PromiseRouter from "express-promise-router";
import AuthController from "../controller/auth_controller.js";


const router = PromiseRouter();
const authController = new AuthController();
//router.post("/login");
router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;