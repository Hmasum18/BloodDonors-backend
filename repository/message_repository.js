import db_query from "../database/oracle_db.js";

export default class MessageRepository {

    insert = async (obj, autoCommit = true) => {
        let columns = Object.keys(obj).join(', ');
        let params = Object.values(obj);
        let query = `
            insert into message
            (${columns})
            values 
            (:1, :2, :3, :4)
        `
        return await db_query(query, params, autoCommit);
    }

    async getMessages(obj, autoCommit = true) {
        let query = `
            select 
                s.name "sender",
                s.id "sender_id",
                r.name "receiver",
                r.id "receiver_id",
                m.text "message",
                m.sent_time,
                m.seen_time,
                m.created
            from
            (
                select * from message where (sender_id = :1 and receiver_id = :2) or (sender_id =: 3 and receiver_id = :4)
            ) m join users s on (m.sender_id = s.id) join users r on (m.receiver_id = r.id)
            where m.active = 1
            order by m.sent_time desc
        `
        let params = [obj.user_id, obj.friend_id, obj.friend_id, obj.user_id]
        return await db_query(query, params, autoCommit)
    }
}