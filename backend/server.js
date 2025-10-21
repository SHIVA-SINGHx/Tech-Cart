import express from 'express'
import 'dotenv/config'
import { ConnectDB } from './database/db.js'
import userRoute from "./routes/userRoute.js"


const app = express()
const PORT = process.env.PORT

app.use(express.json())


app.use("/api/v1/user", userRoute)

app.listen(PORT, ()=>{
    ConnectDB();
    console.log(`Port in running at ${PORT}`);
    
})