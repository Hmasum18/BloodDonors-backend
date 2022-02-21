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

    async getChatList(user_id, autoCommit = true) {

        let query = `
            select
                m.SENDER_ID sender_id, 
                m.RECEIVER_ID receiver_id, 
                m.text text, 
                c.CHATS, 
                c.LAST_CHAT_TIME sent_time, 
                u.name name, 
                u.id user_id
            from message m join 
            (
                select 
                    c.chats chats,
                    max(c.last_chat_time) last_chat_time
                from
                (
                    select receiver_id chats, max(sent_time) last_chat_time from message where sender_id = :1 and active = 1 group by receiver_id
                    union 
                    select sender_id chats, max(sent_time) last_chat_time from message where receiver_id = :2 and active = 1 group by sender_id
    
                ) c 
                group by c.chats
            ) c on ((m.receiver_id = c.chats or m.sender_id = c.chats)  and c.LAST_CHAT_TIME = m.SENT_TIME) join users u on (u.id = c.chats)
            order by c.last_chat_time desc
        `
        let params = [user_id, user_id]
        return await db_query(query, params, autoCommit)
    }
}