import UserController from "../controller/user_controller.js";// import UserRepository class
const userController = new UserController();
import Router from "express-promise-router"; // function
import { authenticateToken } from "../middleware/authorization.js";
 

const router = Router(); // return express Router 

/* import UserRepository from "../repository/user_repository.js"
const userRepo = new UserRepository();

router.get("/", async function (req, res, next) {
    console.log("inside user controller getUsers")
    const result =  await userRepo.findAll();
    if(result.success){
        return res.status(200).json(result.data);
    }
    return res.status(500).json({error: "Internal server error"})
}); */
router.get("/",authenticateToken, userController.getUsers);
router.get("/me", authenticateToken, userController.getUser);
router.get("/:id",authenticateToken, userController.getUser)

export default router;