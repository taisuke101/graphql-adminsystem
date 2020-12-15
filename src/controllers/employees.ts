import { Request, Response } from "express";
import { validate } from "class-validator";

import { User } from '../entity/User';
import { Employee } from '../entity/Employee';

//create employee app.post('/employees')
export const createEmployee = async(req: Request, res: Response) => {
    //const userUuid = req.params.userUuid;
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

//update employee app.put('/employees/:uuid')
export const updateEmployee = async(req: Request, res: Response) => {
    const userEmployeeCode = req.params.employeeCode;
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
        const employee = await Employee.findOneOrFail({ employeeCode: userEmployeeCode })

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

// delete employee app.delete('/employees/:employeeCode')
export const deleteEmployee = async(req: Request, res: Response) => {
    const employeeCode = req.params.employeeCode;

    try {
        const employee = await Employee.findOneOrFail({ employeeCode });
        await employee.remove();

        return res.status(201).json(employee);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'エラーが発生しました！'})
    } 
}
