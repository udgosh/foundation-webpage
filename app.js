const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const morgan = require('morgan')  // morgan is for logging 
var path = require('path');
var indexRouter = require('./routes/index');
const passport = require('passport');
const session = require('express-session');

const MongoStore = require('connect-mongo')




const ejs = require('ejs');


// LOAD CONFIG '
dotenv.config({ path: './config/config.env' })


// passport config
require('./config/passport')(passport)

// connecting to db
connectDB()

const app = express()


// Logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))                    // after setting up morgan we deal with our templete engine
}


// ejs templete engine
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}))



//passport middleware
app.use(passport.initialize())
app.use(passport.session())
// app.use(cookieParser());



//setting static folder
app.use(express.static(path.join(__dirname, 'public')));


//ROUTES 
var indexRouter = require('./routes/index');
// const { default: mongoose } = require('mongoose');
app.use('/', indexRouter);

app.use('/auth', require('./routes/auth'))

const  PORT = process.env.PORT  || 5000


app.listen(PORT , console.log('server running in dev mode'))