
import {db_proc, db_query} from "../database/oracle_db.js";

export default class NotificationRepository{

    findAll = async function (user_id, autoCommit = false){
        let query = `
        begin 
            get_all_notification(:user_id, :y); 
        end;`
        // console.log(r);
        return await db_proc(query, {user_id}, false);
    }
}

