const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js")


const mongoURL = "mongodb://127.0.0.1:27017/wanderlust"


main().then(() => { console.log("connectedToDb") }).catch((e) => { console.log("errrrorr",e) })
async function main() {
    await mongoose.connect(mongoURL);
}


const initDB = async()=>{
    await Listing.deleteMany({});

    initData.data = initData.data.map((obj)=>({...obj,owner : "685b27e5a2736863f26f639a"}))

    await Listing.insertMany(initData.data);
    console.log("data initialized")
}

initDB();