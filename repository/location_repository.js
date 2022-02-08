import db_query from "../database/oracle_db.js";

export default class LocationRepository{
    insertOne = async (location) => {
        let columns = Object.keys(location);
        columns = columns.join(', ');
        console.log(columns);
        let params = Object.values(location);
        console.log(params)
        const query =  `
            insert into location
            (${columns}) 
            values(:1, :2, :3, :4, :5, :6, :7)
        `;
        return await db_query(query, params);
    }

    getOneUsingDescription = async (description) => {
        const query = `
            select *
            from location
            where description = '${description}'
        `
        return await db_query(query, []);
    }
}

