import 'reflect-metadata';
import { createConnection } from "typeorm";
import express from 'express';

import user from './routes/users';
import employee from './routes/employees';
import section from './routes/sections';
import login from './routes/login';

const app = express();
app.use(express.json());
app.use(employee);
app.use(user);
app.use(section);
app.use(login);

createConnection()
    .then(async () => {
        app.listen(5000, () => console.log('server up at http://localhost:5000'))
    })
    .catch((error) => console.log(error))