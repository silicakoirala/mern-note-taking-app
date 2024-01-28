//load env variables
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

//import dependencies 
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./config/connectToDb.js');
const noteRoute = require('./routes/noteRoute.js');
const userRoute = require('./routes/userRoute.js');

//create an express app
const app = express();

//configure express app
app.use(express.json()); //will make it read json off of req body
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true,
}));

//connect to database
connectToDb();

//routing
app.use('/notes',noteRoute);
app.use('/',userRoute);

//start our server
app.listen(process.env.PORT);