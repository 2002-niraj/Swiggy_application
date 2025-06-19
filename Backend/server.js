import app from "./src/app.js"
import dotenv from 'dotenv';
import {connectToDb} from "./src/config/dbConnection.js"

dotenv.config();

const PORT = process.env.PORT;
const startServer = async()=>{
   
     try{
        app.listen(PORT, () => console.log(`Server running on ${PORT}`));
         console.log('Initializing database connection...');
         connectToDb();
         console.log('Database connection established successfully.');
     }
     catch(error){
           console.error('Error establishing database connection:', error.message);
           process.exit(1); 
     }
}

startServer();