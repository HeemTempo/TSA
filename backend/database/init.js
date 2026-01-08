const pool = require('../config/db.js');
const fs = require ('fs');
const path =require ('path');


async function runMigration(){
    try{
        const sql=fs.readFileSync(path.join(__dirname,'schema.sql'),'utf8');

        console.log("Initializng database ");

        await pool.query(sql);

        console.log("Database and Tables created successfully");


    }catch (err){
        console.log("error runing sql scripts",err.message);
    }finally{
        process.exit();
    }
}

runMigration();