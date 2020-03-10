var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var database = require("./lib/database");
var MongoStore =require("connect-mongo")(session);



var app = express();
app.use(session({
    secret: 'asadlfkj!@#!@#dfgasdg',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        url:database.uri
    })
}));

var passport = require('./lib/passport')(app);



var boardRouter = require("./routes/board");
var authRouter = require("./routes/auth")(passport);
var myPetRouter = require("./routes/myPet");
var calenarRouter = require("./routes/calendar");
var mapRouter=require("./routes/map");
var mypageRouter=require("./routes/mypage");


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', authRouter);
app.use('/board', boardRouter);
app.use('/mypet', myPetRouter);
app.use("/calendar",calenarRouter);
app.use("/map",mapRouter);
app.use("/mypage",mypageRouter);


module.exports = app;
