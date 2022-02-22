/**
 * Repository get user related data from database
 * and then returns the data to controller
 */
import {db_proc, db_query} from "../database/oracle_db.js";
const TAG = "user_controlller.js->";

export default class UserRepository{

    findAll = async function (autoCommit = true){
        // console.log("inside findAll")
        const query = `SELECT * FROM users where active = 1 order by created`;
        return await db_query(query, [], autoCommit);
    }

    findByName = async function (filterString, autoCommit = true){
        // console.log("inside findAll")
        const query = `begin
            get_User_by_name(:filterString, :y); 
        end;`;
        return await db_proc(query, {filterString}, autoCommit);
    }

    findOne = async function (id, autoCommit = true) {
        const query = `SELECT * from "USERS" where "ID"=:1 and active = 1`;
        return await db_query(query, [id], autoCommit);
    }

    findUserLocation = async function (location_id, autoCommit = false) {
        // console.log(`${TAG} findUserLocation`)
        const binds = {locationID: location_id};
        const query =  `SELECT * FROM "LOCATION" WHERE ID= :locationID`;
        return await db_query(query, binds, autoCommit);
    }

    searchByBG = async function (blood_group, autoCommit = false) {
        // console.log(`${TAG} findUserLocation`)
        blood_group = blood_group.toLowerCase();
        const query =  `SELECT 
                u.name "name",
                u.id "id",
                u.email "email",
                u.phone_number "phone",
                u.blood_group "blood_group",
                u.gender "gender",
                l.latitude "latitude",
                l.longitude "longitude",
                l.description "description"
            FROM users u join location l on(u.location_id = l.id) WHERE lower(u.blood_group) = :blood_group and u.active = 1`;
        return await db_query(query, {blood_group}, autoCommit);
    }
}

