import {db_query} from "../database/oracle_db.js";

export default class PostReactRepository {

    create = async (obj, autoCommit = true) => {
        let columns = Object.keys(obj).join(', ');
        let params = Object.values(obj);
        let query = `
            insert into post_react
            (${columns})
            values 
            (:1, :2, :3)
        `
        return await db_query(query, params, autoCommit);
    }

    delete = async (obj, autoCommit = true) => {
        let params = [obj.user_id, obj.post_id];
        let query = `
            update post_react set active = 0 where user_id = :1 and post_id = :2
        `
        return await db_query(query, params, autoCommit);
    }

    setReact = async (obj, autoCommit = true) => {
        let params = [obj.user_id, obj.post_id];
        let query = `
            update post_react set active = 1 where user_id = :1 and post_id = :2
        `
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