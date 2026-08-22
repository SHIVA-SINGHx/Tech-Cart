import express from 'express'
import 'dotenv/config'
import { ConnectDB } from './database/db.js'
import userRoute from "./routes/userRoute.js"
import productRoute from "./routes/productRoute.js"
import cartRoute from "./routes/cartRoute.js"
import cors from 'cors'


const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(
  cors({
    origin: [
      "https://tech-cart-delta.vercel.app",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
  })
);


app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);


app.get("/", (req, res)=>{
  return res.send("hello this page")
})

ConnectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database. Server not started.", err);
    process.exit(1);
  });