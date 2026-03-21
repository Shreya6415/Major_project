const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

//BASIC CONNECTION CODE
const Mongourl = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
    console.log("connected to DB");
})
    .catch((err) => {
    console.log(err);
});
async function main() {
    await mongoose.connect(Mongourl);
}

const initDB = async () => {
    await Listing.deleteMany({});
   initData.data = initData.data.map((obj) => ({ ...obj, owner: '698d981c3830902db262484e' }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();