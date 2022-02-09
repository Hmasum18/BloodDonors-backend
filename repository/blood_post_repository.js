import db_query from "../database/oracle_db.js";

export default class BloodPostRepository{

    insertOne = async (postInfo, autoCommit = true) => {
        let columns = Object.keys(postInfo);
        columns = columns.join(', ');
        let params = Object.values(postInfo);
        // console.log("BloodPostRepository:insertOne():")
        // console.log(columns, params)
        const query = `
            insert into blood_post 
            (${columns}) 
            values 
            (:1, :2, :3, :4, :5, :6, :7)
        `
        return await db_query(query, params, autoCommit );
    }

    findOne = async function (id, autoCommit = true) {
        const query = `
            select
                BP.post_id post_id,
                BP.blood_group blood_group,
                BP.amount amount,
                BP.contact contact,
                BP.due_time due_time,
                BP.additional_info additional_info,
                P.created created,
                U.id user_id,
                U.name user_name,
                BP.location_id location_id
            from blood_post BP join post P on(BP.post_id = P.id) join users U on (P.user_id = U.id)
            where BP.post_id = '${id}'
        `

        return await db_query(query, [], autoCommit);
    }

    async findAll(autoCommit = true) {
        const query = `
            select
                BP.post_id post_id,
                BP.blood_group blood_group,
                BP.amount amount,
                BP.contact contact,
                BP.due_time due_time,
                BP.additional_info additional_info,
                P.created created,
                U.id user_id,
                U.name user_name,
                BP.location_id location_id
            from blood_post BP join post P on(BP.post_id = P.id) join users U on (P.user_id = U.id)
        `
        return await db_query(query, [], autoCommit);
    }
}

