// import {db_query} from "./database/oracle_db";

let entity = ['comment', 'post', 'blood post']
let action = ['created', 'updated', 'reacted']
let output = [];

let initial = `insert into ACTION_TYPE (id, entity, ACTION) VALUES (ACTION_TYPE_ID_seq.nextval, `;
for (let ent of entity) {
    for (let act of action) {
        output.push(`${initial} '${ent}', '${act}')`);
    }
}



console.log(output.join(';\n'))