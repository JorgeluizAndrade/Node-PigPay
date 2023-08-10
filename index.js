import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import kpisRoutes from "./routes/kpi.js";
import KPI from "./modules/KPI.js";
import productsRoutes from "./routes/product.js";
import Transaction from "./modules/Transaction.js";
import Product from "./modules/Product.js";
import trasactionRoutes from "./routes/transaction.js";
import { kpis, products, transactions } from "./data/data.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(function (req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
});

app.use(cors({
  origin:"https://pigpay.vercel.app/",
  methods:["GET"],
}));


app.use("/kpi", kpisRoutes);
app.use("/product", productsRoutes);
app.use("/transaction", trasactionRoutes);

const PORT = process.env.PORT;
mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis)
    // Product.insertMany(products)
    // Transaction.insertMany(transactions)
  })
  .catch((error) => console.log(`${error} did not connect`));
