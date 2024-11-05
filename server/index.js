const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const models = require('./models/models');
const router = require('./routes/index');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload());
app.use('/api', router);

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Подключение к базе данных успешно!');

        console.log('Подключенная база данных:', sequelize.getDatabaseName());

        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
