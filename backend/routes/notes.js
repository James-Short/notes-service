import { createNote, getUserIDByCookie, updateNoteTitle, verifyNoteOwnership, updateNoteContent, getNote } from '../db/queries.js';

import express from 'express';

const router = express.Router();

router.post('/createNote', async (req, res) => {
    const { noteTitle, noteContents } = req.body;
    if(noteTitle == null || noteTitle.length <= 0)
        noteTitle = "Blank title";
    try{
        const userId = await getUserIDByCookie(req.cookies['user-cookie']);
        await createNote(noteTitle, noteContents, userId);

        res.status(201).send();
    } catch(err) {
        console.log(err);
        res.status(500).send();
    } 
    

})

router.post('/updateNoteTitle', async (req, res) => {
    const userCookie = req.cookies['user-cookie'];
    const { noteId, noteTitle } = req.body;
    if(noteTitle == null || noteId == null || !userCookie){
        res.status(400).send();
        return;
    }
    const userId = await getUserIDByCookie(userCookie);
    if(userId == null){
        res.status(400).send();
        return;
    }
    const ownsNote = await verifyNoteOwnership(noteId, userId);
    if(!ownsNote){
        res.status(400).send();
    }
    updateNoteTitle(noteId, noteTitle);
    res.status(200).send();
})

router.post('/updateNoteContent', async (req, res) => {
    const userCookie = req.cookies['user-cookie'];
    const { noteId, noteContent } = req.body;
    if(noteContent == null || noteId == null || !userCookie){
        res.status(400).send();
        return;
    }
    const userId = await getUserIDByCookie(userCookie);
    if(!userId){
        res.status(400).send();
        return;
    }
    const ownsNote = await verifyNoteOwnership(noteId, userId);
    if(!ownsNote){
        res.status(400).send();
        return;
    }
    updateNoteContent(noteId, noteContent);
    res.status(200).send();
})

router.post('/getNote', async (req, res) => {
    const userCookie = req.cookies['user-cookie'];
    const { noteId } = req.body;
    if(noteId == null){
        res.status(400).send();
        return
    }
    const userId = await getUserIDByCookie(userCookie);
    if(!userId){
        res.status(400).send();
        return;
    }
    const ownsNote = await verifyNoteOwnership(noteId, userId);
    if(!ownsNote){
        res.status(400).send();
        return;
    }
    const note = await getNote(noteId);
    if(note == null){
        res.status(400).send();
        return;
    }
    res.status(200).send(note);
})


export default router;