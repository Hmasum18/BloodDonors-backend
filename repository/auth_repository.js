import db_query from "../database/oracle_db.js";

export default class AuthRepository{
    /* insertUser = async function (id, name, email, password, role) {
        console.log(`inserting ${id} ${name}, ${email}, ${password}, ${role}`);
        const query =  `insert into "user" ("id", "name", "email", "password", "role") values(:1, :2, :3, :4, :5)`;
        return await db_query(query, [id, name, email, password, role]);
    } */

    insertUserLocation = async function (location) {
        console.log(`inserting ${location.id} ${location.lat}, ${location.lang}, ${location.text}`);
        const query =  `insert into "LOCATION" 
                       ("ID", "LATITUDE", "LONGITUDE", "DESCRIPTION", "CREATED", "UPDATED", "ACTIVE") 
                       values(:1, :2, :3, :4, :5, :6, :7)`;
        const d = new Date();
        return await db_query(query, [
            location.id, //1
            location.lat, // 2
            location.lang, //3
            location.text, //4
            d, //5 created
            d, //6  updated
            1 //7 active
        ]);
    }

    insertUser = async function (user) {
        // console.log(`inserting ${user.id} ${user.name}, ${user.email}, ${user.phone}`);
        const columns = Object.keys(user).join(', ');
        const params = Object.values(user);
        const query =  `insert into "USERS" 
        (${columns}) 
        values(:1, :2, :3, :4, :5, :6, :7, :8, :9, :10, :11)`;
        return await db_query(query, params);
    }

    getUser = async function (email) {
        console.log(`checking ${email}`);
        const query =  `select * from "USERS" where "EMAIL" = :1`;
        return await db_query(query, [email]);
    }
}

