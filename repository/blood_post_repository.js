import db_query from "../database/oracle_db.js";

export default class BloodPostRepository{

    insertOne = async (postInfo) => {
        let columns = Object.keys(postInfo);
        columns = columns.join(', ');
        let params = Object.values(postInfo);
        const query = `
            insert into blood_post 
            (${columns}) 
            values 
            (:1, :2, :3, :4, :5, :6, :7)
        `
        return await db_query(query, params);
    }
}

