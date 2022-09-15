import { Router } from "express";
import { getAllUsers } from "../controllers/users.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

//Get all users
//http://localhost:3002/api/users/getUsers
router.get("/getUsers", checkAuth, getAllUsers);

export default router;
