import { createUser, userSignIn } from "../db/queries.js";
import express from "express";

const router = express.Router();

router.post('/createUser', (req, res) => {
    const { username, email, password } = req.body;
    createUser(username, email, password)
     .then(() => {
        res.send(201);
     })
     .catch(err => {
        res.send(409);
     })
})

router.post('/signIn', (req, res) => {
    const { email, password } = req.body;
    userSignIn(email, password)
    .then(() => {
      res.send(201);
    })
    .catch(err => {
      res.send(409);
    })
})

export default router;