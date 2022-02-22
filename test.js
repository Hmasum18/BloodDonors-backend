// import {db_query} from "./database/oracle_db";

/*
let entity = ['comment', 'post', 'blood post']
let action = ['created', 'updated', 'reacted']
let output = [];

let initial = `insert into ACTION_TYPE (id, entity, ACTION) VALUES (ACTION_TYPE_ID_seq.nextval, `;
for (let ent of entity) {
    for (let act of action) {
        output.push(`${initial} '${ent}', '${act}')`);
    }
}
console.log(output.join(';\n'))*/
import Distance from 'geo-distance'



export default function test (req, res) {
    console.log("test");

    console.log('' + Distance('50 km').human_readable());

// https://www.latlong.net/place/oslo-norway-14195.html: Oslo, Norway, Latitude and longitude coordinates are: 59.911491, 10.757933
    var Oslo = {
        lat: 59.914,
        lon: 10.752
    };
    var Berlin = {
        lat: 52.523,
        lon: 13.412
    };
    var OsloToBerlin = Distance.between(Oslo, Berlin);

    console.log('' + OsloToBerlin.human_readable());
    if (OsloToBerlin > Distance('800 km')) {
        console.log('Nice journey!');
    }

    return res.status(200).json({code: 200});
}