import dotenv from "dotenv";
dotenv.config();
import sql from "mssql";

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true
  },
  port: 1434
};

const connectToDb = async()=>{

    try{
       const pool = await new sql.ConnectionPool(config).connect();
      return pool;
    }
    catch(error){
       console.log(error)
    }
}


export { sql,  connectToDb };