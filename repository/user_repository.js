/**
 * Repository get user related data from database
 * and then returns the data to controller
 */
import {db_query} from "../database/oracle_db.js";
const TAG = "user_controlller.js->";

export default class UserRepository{

    findAll = async function (autoCommit = true){
        // console.log("inside findAll")
        const query = `SELECT * FROM users where active = 1 order by created`;
        return await db_query(query, [], autoCommit);
    }

    findOne = async function (id, autoCommit = true) {
        const query = `SELECT * from "USERS" where "ID"=:1`;
        return await db_query(query, [id], autoCommit);
    }

    findUserLocation = async function (location_id, autoCommit = true) {
        // console.log(`${TAG} findUserLocation`)
        const binds = {locationID: location_id};
        const query =  `SELECT * FROM "LOCATION" WHERE ID= :locationID`;
        return await db_query(query, binds, autoCommit);
    }
}

