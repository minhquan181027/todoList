import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import route from "./routes/userRoute.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL)
    .then(() => {
        console.log("db connect succesfullly");
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on PORT ${PORT}`);
        })
    })
    .catch((err) => console.log(err));

app.use("/api", route);