const port = 5000;

const express = require('express');
const path = require('path');
const cors = require('cors');
const { CounterModel } = require('./models');
const DB = require('./config/db.connect');

const app = express();

app.use(express.json());
app.use(cors());

const startServer = async () => {
    try {
        // await DB.sync();
        await DB.sync({ alter: true });
        // await DB.sync({ force: true });

        await app.listen(port, () => console.log(`Сервер запущен на http://localhost:${port}`));
    } catch (e) {
        console.log(e);
    }
};

app.get('/api/public_counters', async (req, res) => {
    const counters = CounterModel.findAll({ raw: true });

    if (!counters.length) return res.status(404).json();
    return res.status(200).json(counters);
});

app.get('/api/private_counters', async (req, res) => {
    const { userId } = req.query;

    const counters = CounterModel.findAll({ raw: true, where: { hostId: userId } });

    if (!counters.length) return res.status(404).json();
    return res.status(200).json(counters);
});


startServer();
