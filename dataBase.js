// app.js
const postgres = require('postgres');
require('dotenv').config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: 'require',
    connection: {
        options: `project=${ENDPOINT_ID}`,
    },
});

async function getPgVersion() {
    const result = await sql`select version()`;
    console.log(result);
}

getPgVersion()


// require("dotenv").config();
// const { Pool } = require("pg");
//
// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         require: true,
//         rejectUnauthorized: false // Если возникнут ошибки SSL
//     }
// });
// console.log(process.env.DATABASE_URL)
// module.exports = pool;