import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import { Database, Resource } from '@adminjs/sequelize';
import { config } from 'dotenv';

// eslint-disable-next-line import/no-relative-packages
import { UserModel } from '../server/models/index.js';

const PORT = 9000;

AdminJS.registerAdapter({ Database, Resource });
config({ path: '../server/.env' });

const start = async () => {
    try {
        const app = express();

        const admin = new AdminJS();

        const adminRouter = AdminJSExpress.buildRouter(admin);
        app.use(admin.options.rootPath, adminRouter);

        app.listen(PORT, () => {
            console.log(`AdminJS запущен на http://localhost:${PORT}${admin.options.rootPath}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
