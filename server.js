
const express = require('express');

const cookieParser = require('cookie-parser');

const session = require('express-session');

const messages = require('express-messages');

const { validationResult } = require('express-validator');

const flash = require('connect-flash');

const morgan = require('morgan');

const passport = require('passport');

const mongoose = require('mongoose');

// const helmet = require('helmet');

const compression = require('compression');

const path = require('path');

const http = require('http');

// const axios = require('axios').default;

var cors = require('cors');

const indexRoute = require('./src/routes/indexroute');

const usersRoute = require('./src/routes/usersroute');

const setUpPassport = require('./src/auth/setupPassport');

const notFoundAndErrorRoutes = require('./src/routes/notFoundAndErrorCatchRoutes');

// const connectToMongodb = require('./src/utils/mongoDbConnection');

const config = require('./src/config/config');

require('dotenv').config();

setUpPassport();

const mongoConfig = {
    devDbURI: config.db.testURI,
    dbOptions: config.db.dbOptions,
    dbURI: config.db.devURI
}

// connectToMongodb(mongoose, false, mongoConfig);

const app = express();

app.disable('x-powered-by');

// app.use(helmet( { 
//     contentSecurityPolicy: false,
//     crossOriginResourcePolicy: "*" 
// } ));

app.use(cors())

// app.set('port' , config.app.port);

app.set('views' ,path.join( __dirname,  'src', 'views'));

// set view engine
app.set ('view engine', 'ejs');

app.use(morgan('dev'));

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(config.secret.cookieSecret));

// handle sessions
app.use(session({
    secret: config.secret.sessionSecret,
    resave:true,
    saveUninitialized:true
}));

// passport
app.use(passport.initialize());

app.use(passport.session());

// messages
app.use(flash());

app.use((req, res, next) => {
    res.locals.messages = messages();
    next();
});


// set your routes
app.use('*', (req, res, next) => {

    res.locals.currentUser = req.user;

    res.locals.errors = req.flash('error');

    res.locals.infos = req.flash('info');

    res.locals.valErrors = validationResult(req).array();

    next();

});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
// serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRoute);


app.get('/api.mapbox.com.styles/:idPart1/:idPart2/:z/:x/:y/:accessToken', async (req, res) => {



    try {

        const { id, x, y, z, accessToken, idPart1, idPart2 } = req.params;

        console.log(req.params)


        const mapBoxResponse = await axios.get(`https://api.mapbox.com/styles/v1/${idPart1}/${idPart2}/tiles/${z}/${x}/${y}?access_token=${accessToken}`)
         
        console.log(mapBoxResponse.headers)
        // console.log("response is", mapBoxResponse)

        res.status(200).json(mapBoxResponse)
        
     

    } catch(err) {

        console.error(err)

    }

});

app.use('/users', express.static(__dirname, +'/public'));

app.use('/users' ,usersRoute);

app.use(notFoundAndErrorRoutes);
// start your server
http.createServer(app).listen(config.app.port || 3000 , () => {

    console.log(`Kumase site started on port ${ config.app.port }`)

});