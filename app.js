const express = require('express');
const app = express();
const morgan = require('morgan');           // для логирования
const bodyParser = require('body-parser');  // для парсинга body из POST-запросов
const mongoose = require('mongoose');
require('dotenv').config();                 //  Чтобы получить данные из файла .env

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');

mongoose.connect(
    "mongodb+srv://user:" + process.env.MONGO_PASS + "@cluster0.tefog.mongodb.net/academindRestApi",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
mongoose.Promise = global.Promise;  // Чтобы убрать warnings

// middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
        return  res.status(200).json({});
    }
    next();
});

// роуты, которые должны обрабатывать запросы
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Не найдено');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;