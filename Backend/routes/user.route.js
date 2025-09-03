
import express from "express";
const router = express.Router();

import { updateUser , getUser,getALLUsers,deleteUser } from "../controller/user.controller.js";

router.put("/:id",updateUser);

router.delete("/:id",deleteUser);

router.get("/find/:userId",getUser);

router.get("/",getALLUsers);

export default router;