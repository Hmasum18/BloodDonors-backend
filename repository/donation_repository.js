import {db_query} from "../database/oracle_db.js";
import {generateParams} from "../utils/db_params.js";

export default class DonationRepository {

    create = async (obj, autoCommit = true) => {
        let columns = Object.keys(obj).join(', ');
        let params = Object.values(obj);
        let param_place = generateParams(params.length)
        let query = `
            insert into donation
            (${columns})
            values 
            (${param_place})
        `
        // console.log(params, query);
        return await db_query(query, params, autoCommit);
    }

    async getAllReact(post_id, autoCommit = true) {
        let query = `
            select 
                pr.react_name "react_name",
                pr.post_id "post_id",
                pr.created "created",
                u.id "user_id",
                u.name "user_name"
            from post_react pr join users u on (pr.user_id = u.id)
            where pr.post_id = :1 and pr.active = 1
            order by "created"
        `
        let params = [post_id, ]
        return await db_query(query, params, autoCommit);
    }
}