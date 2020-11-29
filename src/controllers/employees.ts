import { Request, Response } from "express";
import { validate } from "class-validator";

import { User } from '../entity/User';
import { Employee } from '../entity/Employee';

//create employee app.post('/employees')
export const createEmployee = async(req: Request, res: Response) => {
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
}
// get employee app.get('/employees')
export const getEmployees = async(_: Request, res: Response) => {
    try {
        const employee = await Employee.find({relations: ['user']})
        return res.status(201).json(employee);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'エラーが発生しました！'})
    }
}

//update employee app.put('/employees/:uuid')
export const updateEmployee = async(req: Request, res: Response) => {
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
}

// delete employee app.delete('/employees/:uuid')
export const deleteEmployee = async(req: Request, res: Response) => {
    const uuid = req.params.uuid;

    try {
        const employee = await Employee.findOneOrFail({ uuid });
        await employee.remove();

        return res.status(201).json(employee);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'エラーが発生しました！'})
    } 
}

// find employee app.get('/employees/:uuid')
export const getEmployee = async (req: Request, res: Response) => {
    const uuid = req.params.uuid;

    try {
        const employee = await Employee.findOneOrFail({ uuid }, {relations: ['user']});
        return res.json(employee);
    } catch(err) {
        console.log(err);
        return res.status(404).json({ error: 'ユーザーが見つかりません！'})
    }
}