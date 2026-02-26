import { execute, fetchAll, fetchOne } from "./db.js";
import argon2 from "argon2";

export async function checkEmailExists(email){
    const row = await fetchOne(
        `SELECT EXISTS (
            SELECT 1 FROM users WHERE email = ?
         ) AS user_exists`,
         [email]
    )
    return(row.user_exists === 1);
}


export async function createUser(username, email, password){
    const emailExists = await checkEmailExists(email);

    if(emailExists){
        throw new Error("EMAIL_ALREADY_EXISTS");
    }
    else{
        const hashedPassword = await argon2.hash(password);


        await execute(
            `INSERT INTO users (username, email, password_hash)
             VALUES(?, ?, ?)`,
             [username, email, hashedPassword]
        )
    }
}

export async function userSignIn(email, password){
    const emailExists = await checkEmailExists(email);

    if(emailExists != 1){
        throw new Error("Email or password is incorrect");
    }
    else{
        const row = await fetchOne(
        `SELECT * FROM users WHERE email = ? LIMIT 1;`,
        [email]
    )

    const passwordsMatch = await argon2.verify(row.password_hash, password);
    if(!passwordsMatch){
        throw new Error("Email or password is incorrect");
    }

    }
    
}

export async function createCookie(email){
    const row = await fetchOne(
        `SELECT * FROM users WHERE email = ? LIMIT 1;`,
        [email]
    )

    if(row){
        const currentDate = new Date();
        let cookieValue = row.id + "" + currentDate.getDate() + currentDate.getHours() + currentDate.getMinutes();
        for(let i = 0; i < 50; i++){
            cookieValue += Math.floor(Math.random() * 10);
        }
        currentDate.setDate(currentDate.getDate() + 1);
        await execute(
            `INSERT INTO cookies (user_id, cookie_value, expires)
             VALUES(?, ?, ?)`,
             [row.id, cookieValue, currentDate]
        )
        
        return cookieValue;
    }
}

export async function getUserIDByCookie(cookieValue){
    const row = await fetchOne(
        `SELECT user_id FROM cookies WHERE cookie_value = ?`,
        [cookieValue]
    );

    if(row)
        return row.user_id;
}

export async function getUserNoteListByID(userID){

    if(userID){
        const notes = await fetchAll(
            `SELECT id, title FROM notes WHERE user_id = ?`,
            [userID]
        );
        return notes
    }

}

export async function createNote(noteTitle, noteContents, userID){
    console.log(userID);
    if(!userID){
        return;
    }
    if(!noteTitle || noteTitle.length <= 0)
        noteTitle = "Blank title";

    await execute(
        `INSERT INTO notes (user_id, title, contents)
        Values (?, ?, ?)`,
        [userID, noteTitle, noteContents]
    );


}

export async function checkCookieExistence(cookieValue){
    const row = await fetchOne(
        `SELECT user_id FROM cookies WHERE cookie_value = ?`,
        [cookieValue]
    );
    if(row){
        return true;
    }
    return false;
}

export async function verifyNoteOwnership(noteId, userId){
    const row = await fetchOne(
        'SELECT * FROM notes WHERE id = ? AND user_id = ?',
        [noteId, userId]
    );
    if(row)
        return true;
    return false;
}

export async function updateNoteTitle(noteId, noteTitle){
    await execute(
        `UPDATE notes
        SET title = ?
        WHERE id = ?`,
        [noteTitle, noteId]
    )
}

export async function updateNoteContent(noteId, noteContent){
    await execute(
        `UPDATE notes
        SET contents = ?
        WHERE id = ?`,
        [noteContent, noteId]
    )
}

export async function getNote(noteId){
    const row = await fetchOne(
        `SELECT title, contents
        FROM notes
        WHERE id = ?`, 
        [noteId]
    )
    return row;
}