import "./db/db.js"
import express from "express";

import userRouter from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:5173', credentials: true}));

app.use("/users", userRouter)


app.listen(8080, () => {
    console.log("Backend running on port 8080");
}) 