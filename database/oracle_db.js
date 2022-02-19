/**
 * Get the oracle db connection
 * and make the queries
 */
import oracledb from 'oracledb';
oracledb.outFormat = oracledb.OBJECT;
// https://stackoverflow.com/questions/34216477/node-js-oracle-driver-retrieving-clob-field
oracledb.fetchAsString = [ oracledb.CLOB ];

var connection = undefined;

// default can be imported as import db_query from "./database/oracle_db.js"
export default async function db_query(query, params, autoCommit){
    console.log("inside db query")
    if(connection === undefined){
        connection = await oracledb.getConnection({
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_CONNECTION_STRING
        })
        console.log("connected to database");
    }
    let result;
    try{
        result = await connection.execute(query, params, {autoCommit: autoCommit, outFormat: oracledb.OUT_FORMAT_OBJECT });
        return {

            success: true,
            data: result.rows,
        };
    }catch(e){
        return {
            success: false,
            error: e.message,
        };
    }
}

// must be imported as import {hello1, hello} from "./database/oracle_db.js"
// or import {hello1, hello} from "./database/oracle_db.js"
// order doesn't matter
/* export function hello1(){
    console.log("exported hello1")
}

export function hello(){
    console.log("exported hello")
} */
