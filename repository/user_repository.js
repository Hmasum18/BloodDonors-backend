/**
 * Repository get user related data from database
 * and then returns the data to controller
 */
import db_query from "../database/oracle_db.js";

export default class UserRepository{
    
    /* findAll = async function (){
        console.log("inside findAll")
        const query = `SELECT "id", "name", "email", "role" FROM "users"`;
        return await db_query(query, []);
    }
 */
    findAll = async function (){
        console.log("inside findAll")
        const query = `SELECT * FROM "USERS"`;
        return await db_query(query, []);
    }

    findOne = async function (id) {
        const query = `SELECT * from "USERS" where "ID"=:1`;
        return await db_query(query, [id]);
    }
}

