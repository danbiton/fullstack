const mongoose = require ("mongoose")


async function connectDB(){
    const uri = process.env.MONGO_DB_URI
    try{
       await mongoose.connect(uri)
       console.log("mongoDB connected")

    }
    catch(error){
     console.log(error);
    };
    
}
module.exports = connectDB;