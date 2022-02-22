
import {db_proc, db_query} from "../database/oracle_db.js";
import {generateParams} from "../utils/db_params.js";

export default class DonationPostRepository{

    create = async function (obj, autoCommit = true){
        let columns = Object.keys(obj).join(', ');
        let params = Object.values(obj);
        const param_place = generateParams(params.length);
        const query =  `insert into donation_post 
        (${columns}) 
        values(${param_place})`;
        return await db_query(query, params, autoCommit);
        // console.log(r);
        // return await db_proc(query, {user_id}, false);
    }
}

