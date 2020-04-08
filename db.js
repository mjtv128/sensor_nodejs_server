const Pool = require("pg").Pool;
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://postgres@localhost:5432/postgres?sslmode=disable"
});

pool.on("connect", () => {
  console.log("Connected to postgres database");
});

const query = (sql, parameters) => {
  return new Promise((resolve, reject) => {
    pool
      .query(sql, parameters)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = {
  query
};
