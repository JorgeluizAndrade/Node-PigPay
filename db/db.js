import { mongoose } from 'mongoose'
// import KPI from "./modules/KPI.js";
// import Transaction from "./modules/Transaction.js";
// import Product from "./modules/Product.js";
// import { kpis, products, transactions } from "./data/data.js";


export const connectDb = async ()=> {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
            // await mongoose.connection.db.dropDatabase();
            // KPI.insertMany(kpis)
            // Product.insertMany(products)
            // Transaction.insertMany(transactions)
        console.log(`mongodb connected: ${connect.connection.host}`)
    } catch(error){
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}