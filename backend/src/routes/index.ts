import express from "express"
import authRoute from "./authRoute";
// import blogRoute from "./blogRoute";

const app = express();

app.use("/auth", authRoute);
// router.use("/blogs", blogRoute);

export default app;