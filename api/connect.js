//import mysql from "mysql"
import mysql from "mysql2"


export const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"Devanshusingh01",
  database:"tata-connect"
})