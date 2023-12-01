import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import kpisRoutes from "./routes/kpi.js";
import productsRoutes from "./routes/product.js";
import trasactionRoutes from "./routes/transaction.js";
import { connectDb } from "./db/db.js";


dotenv.config();

connectDb()

export const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.use("/kpi", kpisRoutes);
app.use("/product", productsRoutes);
app.use("/transaction", trasactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Running in http://localhost:${PORT}`);
  });

mongoose.Promise = global.Promise;

