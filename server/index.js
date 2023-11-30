require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { Op } = require('sequelize');
const { CounterModel, UserModel } = require('./models');
const DB = require('./config/db.connect');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../dist')));

const startServer = async () => {
    try {
        // await DB.sync();
        await DB.sync({ alter: true });
        // await DB.sync({ force: true });

        await app.listen(process.env.PORT, () =>
            console.log(`Сервер запущен на http://localhost:${process.env.PORT}`),
        );
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

    return res.status(200).json(counters);
});

app.get('/api/private_counters', async (req, res) => {
    const { userId } = req.query;

    const counters = await CounterModel.findAll({
        raw: true,
        where: { hostId: userId },
    });

    if (!counters.length) return res.status(404).json();

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

app.post('/api/share_counter', async (req, res) => {
    const { receiverLogin, counterId } = req.body;

    const candidate = await UserModel.findAll({ raw: true, where: { login: receiverLogin } });
    if (!candidate.length) {
        return res.status(404).json({ message: 'Такой пользователь не найден ;(' });
    }

    const foundCounter = await CounterModel.findAll({
        raw: true,
        where: { id: counterId },
    });

    const { title, date, isPrivate } = foundCounter[0];

    await CounterModel.create({
        title,
        date,
        isPrivate,
        hostId: candidate[0].id,
    });

    return res
        .status(200)
        .json({ message: 'Твое предложение поделиться счетчиком успешно отправлено' });
});

app.post('/api/delete_counter', async (req, res) => {
    const { counterId } = req.body;

    await CounterModel.destroy({ where: { id: counterId } });

    return res.status(200).json({ message: 'Счетчик успешно удален' });
});

app.get('/*', (req, res) => res.sendFile(path.resolve(__dirname, '../dist/index.html')));

startServer();
