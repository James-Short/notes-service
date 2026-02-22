import { createCookie, createUser, userSignIn } from "../db/queries.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";



const router = express.Router();
router.use(cookieParser());
router.use(cors({origin: 'http://localhost:5173', credentials: true}));

router.post('/createUser', (req, res) => {
    const { username, email, password } = req.body;
    createUser(username, email, password)
     .then(() => {
        res.status(201).send();
     })
     .catch(err => {
        res.status(409).send();
     })
})

router.post('/signIn', (req, res) => {
    const { email, password } = req.body;
    userSignIn(email, password)
    .then(() => {
       createCookie(email)
       .then((value) => {
          console.log(value);
          res.cookie("user-cookie", value, {
            maxAge: 86400000,
            httpOnly: true,
            sameSite: "lax",
            secure: false
         });
          res.status(202).send();
        })  
    })
    .catch(err => {
      res.status(409).send();
    })
})

router.get('/getUserHomepage', (req, res) => {
   console.log("Something happened");
   console.log(req.cookies);
   res.status(200).send();
})

export default router;