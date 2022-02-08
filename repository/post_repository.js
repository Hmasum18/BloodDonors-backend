import db_query from "../database/oracle_db.js";

export default class PostRepository{
    insertOne = async (postInfo) => {
        const query = `
            insert into post 
            (id, user_id, description, privacy, created, updated, active) 
                       values(:1, :2, :3, :4, :5, :6, :7)
        `
        const params = [
            postInfo.id,
            postInfo.user_id,
            postInfo.description,
            postInfo.privacy,
            postInfo.created,
            postInfo.updated,
            postInfo.active
        ]
        return await db_query(query, params);
    }
}

