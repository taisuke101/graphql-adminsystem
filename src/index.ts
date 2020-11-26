import 'reflect-metadata';
import { createConnection } from "typeorm";
import { validate } from 'class-validator';
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { Section } from './entity/Section';
import { User } from './entity/User';
import { Employee } from './entity/Employee';
import generateToken from './utils/generateToken';

const app = express();
app.use(express.json())

//CREATE user
app.post('/users', async(req: Request, res: Response) => {
    let { 
        userId,
        password,
        confirmPassword
    } = req.body;

    try {
        const user = await User.findOne({ userId })
            if (user) {
                throw new Error('すでに存在しているユーザーです！')
            }
            if(password !== confirmPassword) {
                throw new Error('パスワードが一致しません！');
            }

        password = await bcrypt.hash(password, 12)

        const newUser = new User ({ 
            userId,
            password
        })

        const errors = await validate(newUser);
        if (errors.length > 0) throw errors;

        await newUser.save();

        return res.json(newUser);
    } catch(err) {
        console.log(err)
        return res.status(500).json(err)
    }
})
//login user
app.post('/login', async(req: Request, res: Response) => {
    const {
        userId,
        password
    } = req.body;

    const user = await User.findOne({ userId });
        if(!user) {
            throw new Error('ユーザーが見つかりません！')
        }
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('登録情報と一致しません！')
    }

    const token = generateToken(user);
    return res.json({
        ...user,
        token
    });
})

//READ
app.get('/users', async(_: Request, res: Response) => {
    try {
        const user = await User.find({ relations: ['employee', 'section']});
        return res.json(user);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'エラーが発生しました！'})
    }
})

//UPDATE
app.put('/users/:uuid', async(req: Request, res: Response) => {
    const uuid = req.params.uuid;
    let { 
        userId,
        password
    } = req.body;

    try {
        const user = await User.findOneOrFail({ uuid })

        password = await bcrypt.hash(password, 12)

        user.userId = userId || user.userId;
        user.password = password || user.password;

        const errors = await validate(user);
        if (errors.length > 0) throw errors;

        await user.save();
        return res.json(user);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'エラーが発生しました！'})
    }
})

//DELETE
app.delete('/users/:uuid', async(req: Request, res: Response) => {
    const uuid = req.params.uuid;

    try {
        const user = await User.findOneOrFail({ uuid });
        await user.remove();

        return res.status(201).json(user)
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'エラーが発生しました！'})
    } 
})

//FIND
app.get('/users/:uuid', async (req: Request, res: Response) => {
    const uuid = req.params.uuid;

    try {
        const user = await User.findOneOrFail({ uuid }, {relations: ['employee', 'section']});
        return res.json(user);
    } catch(err) {
        console.log(err);
        return res.status(404).json({ employee: 'ユーザーが見つかりません！'})
    }
})

//create employee
app.post('/employees', async(req: Request, res: Response) => {
    const {
        userUuid,
        employeeCode,
        lastName,
        firstName,
        lastKanaName,
        firstKanaName,
        gender,
        birthDay,
        hireDate
    } = req.body;

    try {
        const user = await User.findOneOrFail({ uuid: userUuid })
        const employee = new Employee ({
            employeeCode,
            lastName,
            firstName,
            lastKanaName,
            firstKanaName,
            gender,
            birthDay,
            hireDate,
            user
        })

        const errors = await validate(employee);
        if (errors.length > 0) throw errors;

        await employee.save();
        return res.status(201).json(employee);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'エラーが発生しました！'})
    }
})
// get employee
app.get('/employees', async(_: Request, res: Response) => {
    try {
        const employee = await Employee.find({relations: ['user']})
        return res.status(201).json(employee);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'エラーが発生しました！'})
    }
})

//update employee
app.put('/employees/:uuid', async(req: Request, res: Response) => {
    const uuid = req.params.uuid;
    const { 
        employeeCode,
        lastName,
        firstName,
        lastKanaName,
        firstKanaName,
        gender,
        birthDay,
        hireDate
    } = req.body;

    try {
        const employee = await Employee.findOneOrFail({ uuid })

        employee.employeeCode = employeeCode || employee.employeeCode,
        employee.lastName = lastName || employee.lastName,
        employee.firstName = firstName || employee.firstName,
        employee.lastKanaName = lastKanaName || employee.lastKanaName,
        employee.firstKanaName = firstKanaName || employee.firstKanaName,
        employee.gender = gender || employee.gender,
        employee.birthDay = birthDay || employee.birthDay,
        employee.hireDate = hireDate || employee.hireDate

        const errors = await validate(employee);
        if (errors.length > 0) throw errors;

        await employee.save();
        return res.json(employee);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'エラーが発生しました！'})
    }
})

// delete employee
app.delete('/employees/:uuid', async(req: Request, res: Response) => {
    const uuid = req.params.uuid;

    try {
        const employee = await Employee.findOneOrFail({ uuid });
        await employee.remove();

        return res.status(201).json(employee);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'エラーが発生しました！'})
    } 
})

// find employee
app.get('/employees/:uuid', async (req: Request, res: Response) => {
    const uuid = req.params.uuid;

    try {
        const employee = await Employee.findOneOrFail({ uuid }, {relations: ['user']});
        return res.json(employee);
    } catch(err) {
        console.log(err);
        return res.status(404).json({ error: 'ユーザーが見つかりません！'})
    }
})

// create section 
app.post('/sections', async (req: Request, res: Response) => {
    const {
        userUuid,
        sectionCode,
        sectionName
    } = req.body;

    try {
        const user = await User.findOneOrFail({ uuid: userUuid })
        const section = new Section ({
            user,
            sectionCode,
            sectionName
        })

        const errors = await validate(section);
        if (errors.length > 0) throw errors;

        await section.save();
        return res.status(201).json(section);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'エラーが発生しました！'})
    }
})

// get section
app.get('/sections', async(req: Request, res: Response) => {
    try {
        const section = await Section.find({relations: ['user']})
        return res.status(201).json(section);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'エラーが発生しました！'})
    }
})

// update section
app.put('/sections/:uuid', async(req: Request, res: Response) => {
    const uuid = req.params.uuid;
    const { 
        sectionCode,
        sectionName
    } = req.body;

    try {
        const section = await Section.findOneOrFail({ uuid })

        section.sectionCode = sectionCode || section.sectionCode;
        section.sectionName = sectionName || section.sectionName;

        const errors = await validate(section);
        if (errors.length > 0) throw errors;

        await section.save();
        return res.json(section);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'エラーが発生しました！'})
    }
})

//delete section
app.delete('/sections/:uuid', async(req: Request, res: Response) => {
    const uuid = req.params.uuid;

    try {
        const section = await Section.findOneOrFail({ uuid });
        await section.remove();

        return res.status(201).json(section)
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'エラーが発生しました！'})
    } 
})

//find section
app.get('/sections/:uuid', async (req: Request, res: Response) => {
    const uuid = req.params.uuid;

    try {
        const section = await Section.findOneOrFail({ uuid }, {relations: ['user']});
        return res.json(section);
    } catch(err) {
        console.log(err);
        return res.status(404).json({ error: 'ユーザーが見つかりません！'})
    }
})

createConnection()
    .then(async () => {
        app.listen(5000, () => console.log('server up at http://localhost:5000'))
    })
    .catch((error) => console.log(error))