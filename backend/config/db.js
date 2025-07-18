import mysql from 'mysql'
import dotenv from 'dotenv';

dotenv.config();

export const connetDB = () => {
    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })
    
    // Connect
    db.connect((err) => {
       if (err) {
         console.error('DB connection failed:', err);
         process.exit(1);
       } 
     });

     return db
}
