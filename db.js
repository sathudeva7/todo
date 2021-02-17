const Pool = require("pg").Pool;

const pool = new Pool({
    user:"sathu@pern-stack",
    password:"Abcd1234",
    host:"pern-stack.postgres.database.azure.com",
    port:"5432",
    database:"tobo"
});

module.exports = pool;