import "./db/db.js"
import express from "express";

import userRouter from "./routes/users.js";

const app = express();
app.use(express.json());

app.use("/users", userRouter)


app.listen(8080, () => {
    console.log("Backend running on port 8080");
}) 