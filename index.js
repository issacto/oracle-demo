//express
const express = require('express')
var cors = require('cors')

const {oracledb} = require("./db-config");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const app = express()
const port = 5000

//app.use(cors())
app.use(cors())
//routes
app.get("/", async function (req, res) {
    let connection = await oracledb.getConnection({
      user: process.env.USERNAME,
      password: process.env.PASSWORD,
      connectionString: process.env.CONNECTIONSTRING,
    });
    console.log("ehruaer")
    try {
      const sql = `SELECT * FROM ACTIVEUSER`;
      const result = await connection.execute(sql);
      res.status(200).send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(502).send(err);
    }
    try {
      await connection.close();
    } catch (err) {
      console.error(err);
      res.status(502).send(err);
    }
  });


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})