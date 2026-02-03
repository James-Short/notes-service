import { execute, fetchAll, fetchOne } from "./db.js";
import argon2 from "argon2";


export async function createUser(username, email, password){
    const row = await fetchOne(
        `SELECT EXISTS (
            SELECT 1 FROM users WHERE email = ?
         ) AS exists`,
         [email]
    )

    if(row.exists === 1){
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