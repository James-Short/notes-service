import { createCookie, createUser, userSignIn, getUserNoteListByCookie } from "../db/queries.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";



const router = express.Router();

router.post('/createUser', (req, res) => {
    const { username, email, password } = req.body;
    createUser(username, email.toLowerCase(), password)
     .then(() => {
        res.status(201).send();
     })
     .catch(err => {
        res.status(409).send();
     })
})

router.post('/signIn', (req, res) => {
    const { email, password } = req.body;
    userSignIn(email.toLowerCase(), password)
    .then(() => {
       createCookie(email)
       .then((value) => {
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
   const userCookie = req.cookies['user-cookie'];
   if(!userCookie){
      res.status(422).send();
   }

   const userNoteList = getUserNoteListByCookie(userCookie);
   if(!userNoteList)
      res.status(404).send();
   if(userNoteList.length === 0)
      res.status().send();
   res.status(200).send(userNoteList);
})

export default router;