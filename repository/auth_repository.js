import db_query from "../database/oracle_db.js";

export default class AuthRepository{
    /* insertUser = async function (id, name, email, password, role) {
        console.log(`inserting ${id} ${name}, ${email}, ${password}, ${role}`);
        const query =  `insert into "user" ("id", "name", "email", "password", "role") values(:1, :2, :3, :4, :5)`;
        return await db_query(query, [id, name, email, password, role]);
    } */

    insertUserLocation = async function (location, autoCommit = true) {
        // console.log(`inserting ${location.id} ${location.lat}, ${location.lang}, ${location.text}`);
        const query =  `insert into "LOCATION" 
                       ("ID", "LATITUDE", "LONGITUDE", "DESCRIPTION") 
                       values(:1, :2, :3, :4)`;
        return await db_query(query, [
            location.id, //1
            location.lat, // 2
            location.lang, //3
            location.text, //4
        ], autoCommit);
    }

    insertUser = async function (user, autoCommit = true) {
        // console.log(`inserting ${user.id} ${user.name}, ${user.email}, ${user.phone}`);
        const columns = Object.keys(user).join(', ');
        const params = Object.values(user);
        const query =  `insert into "USERS" 
        (${columns}) 
        values(:1, :2, :3, :4, :5, :6, :7, :8)`;
        return await db_query(query, params, autoCommit);
    }

    getUser = async function (email, autoCommit = true) {
        // console.log(`checking ${email}`);
        const query =  `select * from "USERS" where "EMAIL" = :1`;
        return await db_query(query, [email], autoCommit);
    }
}

