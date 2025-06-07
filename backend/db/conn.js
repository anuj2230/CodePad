const mongoose = require("mongoose");
const DB = process.env.DB;

mongoose
    .connect(DB)
    .then(() => {
        console.log(`Database Connected Successfully!`);
    })
    .catch((err) => {
        console.log(`An error occured .The Error is :${err}`);
    });
