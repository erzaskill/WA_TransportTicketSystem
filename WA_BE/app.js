const express = require('express');
const app = express();
const jwt = require('express-jwt');
const {jwtConfig} = require("./config");
const config = require("./config");

//routes
const homepageRouter = require('./routes/homepage');
//FE connection via cors

// register all routes
app.use('/', homepageRouter);


app.use(express.json());
const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})