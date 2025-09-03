import express from "express";
const router = express.Router();
import { createBanner, deleteBanner, getAllBanners, getRandomBanner } from "../controller/banner.controller.js";

router.post("/",createBanner);

router.get("/",getAllBanners);

router.delete("/:id",deleteBanner);

router.get("/random",getRandomBanner);
export default router;

/*
4. RESTful API convention (short version)

/api/banner → deal with the collection

/api/banner/:id → deal with a single item

/api/banner/random → deal with a special action
*/