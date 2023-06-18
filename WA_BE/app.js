//SETUP
const express = require('express');
const app = express();
const {initializeDatabase} = require('./database/database');
const jwt = require('express-jwt');
const {jwtConfig} = require("./config");
const config = require("./config");

//routes
const homepageRouter = require('./routes/homepage');

//FE connection via cors

//set up everything
initializeDatabase();
app.use(express.json());

// register all routes
app.use('/', homepageRouter);



const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})