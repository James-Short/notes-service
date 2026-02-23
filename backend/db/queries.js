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

    if(emailExists === 0){
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

export async function getUserNoteListByCookie(cookieValue){
    const userID = await fetchOne(
        `SELECT user_id FROM cookies WHERE cookie_value = ?`,
        [cookieValue]
    )

    if(userID){
        const notes = await fetchAll(
            `SELECT id, title FROM notes WHERE user_id = ?`,
            [userID]
        );
        return notes
    }

}