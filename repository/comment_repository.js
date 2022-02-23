import {db_proc, db_query} from "../database/oracle_db.js";

export default class CommentRepository {

    create = async (obj, autoCommit = true) => {
        let columns = Object.keys(obj).join(', ');
        let params = Object.values(obj);
        let query = `
            insert into comments
            (${columns})
            values 
            (:1, :2, :3, :4)
        `
        return await db_query(query, params, autoCommit);
    }

    async getAllComment(post_id, autoCommit = true) {
        let query = `
            select 
                c.id "comment_id",
                c.text "text",
                c.post_id "post_id",
                c.created "created",
                u.id "user_id",
                u.name "user_name"
            from comments c join users u on (c.user_id = u.id)
            where c.post_id = :1 and c.active = 1
            order by c.created desc
        `
        let params = [post_id]
        return await db_query(query, params, autoCommit)
    }


    async deleteComment(obj, autoCommit = true) {
        // console.log(obj);
        const query = `
            begin
                delete_comment(:comment_id, :user_id, :y);
            end;    
        `
        // console.log(query)
        return await db_proc(query, obj, autoCommit)
    }
}