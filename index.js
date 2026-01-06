const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.listen(4403, () => {
    console.log("App is listen on 4403...");
})