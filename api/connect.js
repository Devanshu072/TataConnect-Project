//import mysql from "mysql"
// import mysql from "mysql2";

// export const db = mysql.createConnection({
//   host: process.env.DB_HOST || "localhost",  // Use environment variable or default to localhost
//   port: process.env.DB_PORT || 3306,          // Use environment variable or default to 3306
//   user: process.env.DB_USER || "root",        // Use environment variable or default to root
//   password: process.env.DB_PASSWORD || "Devanshusingh01", // Use environment variable or default to your password
//   database: process.env.DB_NAME || "tata-connect" // Use environment variable or default to your database name
// });

import mysql from "mysql2";
import dotenv from "dotenv";

// Load environment variables from a .env file if available
dotenv.config();

export const db = mysql.createConnection({
  host: process.env.DB_HOST || "tata-connect.clqucg0gm3zn.us-east-1.rds.amazonaws.com",  // Use environment variable or default to your RDS endpoint
  port: process.env.DB_PORT || 3306,                 // Use environment variable or default to 3306
  user: process.env.DB_USER || "root",  // Use environment variable or default to your RDS username
  password: process.env.DB_PASSWORD || "Devanshusingh01", // Use environment variable or default to your RDS password
  database: process.env.DB_NAME || "tata_connect_db"    // Use environment variable or default to your database name
});
