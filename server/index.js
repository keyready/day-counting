const port = 5000;

const express = require('express');
const path = require('path');
const cors = require('cors');
const { Op } = require('sequelize');
const { CounterModel, UserModel } = require('./models');
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
    const { userId } = req.query;

    const counters = await CounterModel.findAll({
        raw: true,
        where: { isPrivate: false, hostId: { [Op.not]: userId } },
    });

    if (!counters.length) return res.status(404).json();

    for (let i = 0; i < counters.length; i += 1) {
        counters[i].hostName = 'Родион';
    }
    return res.status(200).json(counters);
});

app.get('/api/private_counters', async (req, res) => {
    const { userId } = req.query;

    const counters = await CounterModel.findAll({
        raw: true,
        where: { hostId: userId },
    });

    if (!counters.length) return res.status(404).json();

    for (let i = 0; i < counters.length; i += 1) {
        counters[i].hostName = 'Родион';
    }

    return res.status(200).json(counters);
});

app.post('/api/create_counter', async (req, res) => {
    const newCounter = req.body;

    const counter = await CounterModel.create(newCounter);

    res.status(200).json(counter);
});

app.post('/api/user_auth', async (req, res) => {
    const { name, login, password } = req.body;

    if (name) {
        const user = await UserModel.create({ name, login, password });
        return res.status(200).json(user);
    }

    const candidate = await UserModel.findAll({ raw: true, where: { login } });

    if (candidate[0]) {
        if (candidate[0].password === password)
            return res.status(200).json({
                ...candidate[0],
                password: '',
            });
        return res.status(403).json({ message: 'Неверный пароль', status: 2 });
    }
    return res.status(404).json({ message: 'Пользователь с таким логином не найден', status: 1 });
});

startServer();
