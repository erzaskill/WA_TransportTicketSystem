//SETUP
const express = require('express');
const app = express();
const {initializeDatabase} = require('./database/database');
const jwt = require('express-jwt');
const {jwtConfig} = require("./config");
const config = require("./config");

//routes
const homepageRouter = require('./routes/homepage');
const userRouter = require('./routes/user');
const stationRouter = require('./routes/stations');
const ticketRouter = require('./routes/ticket');
const linkRouter = require('./routes/link');

//FE connection via cors
const cors = require("cors");

//set up everything
initializeDatabase();
app.use(express.json());
app.use(cors({origin: config.allowedFrontendOrigin}));

// protect routes against unauthorized access
app.use('/station', jwt(jwtConfig));
app.use('/user/info', jwt(jwtConfig));
app.use('/users', jwt(jwtConfig));
app.use('/ticket', jwt(jwtConfig));
app.use('/link', jwt(jwtConfig));


// register all routes
app.use('/', homepageRouter);
app.use('/user', userRouter);
app.use('/users', userRouter);
app.use('/station', stationRouter);
app.use('/stations', stationRouter);
app.use('/ticket', ticketRouter);
app.use('/link', linkRouter);
app.use('/links', linkRouter);

// start the app on the given port
const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})