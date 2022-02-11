import db_query from "../database/oracle_db.js";

export default class CommentRepository {

    create = async (obj, autoCommit = true) => {
        let columns = Object.keys(obj).join(', ');
        let params = Object.values(obj);
        let query = `
            insert into comments
            (${columns})
            values 
            (:1, :2, :3, :4, :5, :6, :7)
        `
        return await db_query(query, params, autoCommit);
    }

    async getAllComment(post_id, autoCommit = true) {
        let query = `
            select 
                
        `
    }
}