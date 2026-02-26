import { createCookie, createUser, userSignIn, getUserNoteListByID, getUserIDByCookie, checkCookieExistence } from "../db/queries.js";
import express from "express";



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

router.post('/signIn', async (req, res) => {
    let { email, password } = req.body;
    if(email)
      email = email.toLowerCase();
    try{
      await userSignIn(email, password);
      const cookievalue = await createCookie(email);
      res.cookie("user-cookie", cookievalue, {
            maxAge: 86400000,
            httpOnly: true,
            sameSite: "lax",
            secure: false
      });
      res.status(202).send();
      return;

    } catch(err){
      res.status(409).send();
      return;
    }

})

router.get('/verifyCookie', async (req, res) => {
   const userCookie = req.cookies['user-cookie'];
   if(!userCookie || userCookie == undefined){
      res.status(404).send();
      return;
   }
   const cookieExists = await checkCookieExistence(userCookie);
   if(cookieExists){
      res.status(200).send();
      return;
   }
   res.status(404).send();
})

router.get('/getUserTaskList', async (req, res) => {
   const userCookie = req.cookies['user-cookie'];
   if(!userCookie || userCookie == undefined){
      res.status(422).send();
      return;
   }

   try{
      const userID = await getUserIDByCookie(userCookie);
      const userNoteList = await getUserNoteListByID(userID);
      res.status(200).send(userNoteList);
   } catch(err){
      res.send(400);
   }
   
})

export default router;