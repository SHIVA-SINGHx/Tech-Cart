import express from 'express'
import 'dotenv/config'
import { ConnectDB } from './database/db.js'


const app = express()
const PORT = process.env.PORT

app.listen(PORT, ()=>{
    ConnectDB();
    console.log(`Port in running at ${PORT}`);
    
})