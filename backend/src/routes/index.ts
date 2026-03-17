import express from "express";
import authRoute from "./authRoute";
import blogRoute from "./blogRoute";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/blogs", blogRoute);

export default router;
