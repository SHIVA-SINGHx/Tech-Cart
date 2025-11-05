import express from 'express'
import 'dotenv/config'
import { ConnectDB } from './database/db.js'
import userRoute from "./routes/userRoute.js"
import productRoute from "./routes/productRoute.js"
import cors from 'cors'


const app = express()
const PORT = process.env.PORT


app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))


app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);

app.listen(PORT, ()=>{
    ConnectDB();
    console.log(`Port in running at ${PORT}`);
    
})