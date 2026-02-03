import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "db", "app.db");
const schemaPath = path.join(process.cwd(), "db", "schema.sql");

const db = new sqlite3.Database(dbPath);

db.exec(fs.readFileSync(schemaPath, "utf8"));

export function execute(sql, params=[]){
    return new Promise((resolve, reject) => {
        db.run(sql, params, (err) => {
            if(err) reject(err);
            resolve();
        });
    });
}

export function fetchAll(sql, params=[]){
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if(err) reject(err);
            resolve(rows);
        })
    })
}

export function fetchOne(sql, params=[]){
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if(err) return reject(err);
            resolve(row);
        })
    })
}