import {db_query} from "../database/oracle_db.js";
import {generateParams} from "../utils/db_params.js";

export default class DonationRepository {

    create = async (obj, autoCommit = true) => {
        let columns = Object.keys(obj).join(', ');
        let params = Object.values(obj);
        let param_place = generateParams(params.length)
        let query = `
            insert into donation
            (${columns})
            values 
            (${param_place})
        `
        // console.log(params, query);
        return await db_query(query, params, autoCommit);
    }

    async findDonationByID(donation_id, autoCommit = false) {
        let query = `
            select 
                d.donation_time "donation_time",
                l.latitude "latitude",
                l.longitude "longitude",
                l.description "display_name"
            from donation d join location l on (d.location_id = l.id)
            where d.id = :donation_id and d.active = 1
        `
        return await db_query(query, {donation_id}, autoCommit);
    }

    getLastDonation = async (user_id, autoCommit = false) => {
        const query = `
            select max(donation_time) "last_donation"
            from donation where user_id = :user_id and active = 1
        `
        return await db_query(query, {user_id}, autoCommit);
    }
}