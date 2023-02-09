const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const config = require('./config/database');
const requestLogger = require('./utils/requestLogger');
const errorLogger = require('./utils/errorLogger');
const userRoute = require('./routes/userRoute');
const blogRoute = require('./routes/blogRoute');

const PORT = 8080;
const HOST = '127.0.0.1';
const DBS_URL = config.database_url;

const app = express();

// function connectToDataBase(req, res, next) {
// }

mongoose.set('strictQuery', false);
mongoose.connect(DBS_URL + 'user', () => {
    console.log('Database connection successful to the database server');
});


app.use(cors({
    origin: 'http://127.0.0.1:4401',
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: 'strict',
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        domain: '127.0.0.1'
    },
    store: MongoStore.create({
        // mongoUrl:'',
        client: mongoose.connection.getClient(),
        collectionName: 'sessions'
    })
}));

app.use(requestLogger);
app.use('/images',express.static(path.join(__dirname,'./public/images')))
app.get('/', (req, res, next) => {
    res.json({ msg: "Invalid path" });
});
app.use('/users', userRoute);
app.use('/api/blogs', blogRoute);
app.use(errorLogger);

app.listen(PORT, HOST, () => {
    console.log(`App is running on http://${HOST}:${PORT}`);
});
