import "./db/db.js"
import { createUser } from "./db/queries.js";
import express from "express";

const app = express();
app.use(express.json());


app.post('/test', (req, res) => {
    const { username, email, password } = req.body;
    createUser(username, email, password);

    
})

app.listen(8080, () => {
    console.log("Backend running on port 8080");
}) 