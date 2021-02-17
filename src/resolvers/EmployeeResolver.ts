import { UserInputError } from "apollo-server-express";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";


import { Employee } from "../entity/Employee";
import { User } from "../entity/User";
import { createEmployeeInput, updateEmployeeInput } from "../inputs/EmployeeInput";
import { isAuth } from "../middleware/isAuth";

@Resolver()
export class EmployeeResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Employee)
    async createEmployee(@Arg('userId') userId: string, @Arg('data') data: createEmployeeInput) {
        try {
            const user = await User.findOne({ userId });
            if (!user)
                throw new UserInputError('ユーザーが見つかりません！');

            const newEmployee = new Employee({
                user: user,
                ...data
            })

            const employee = await newEmployee.save();

            return employee;
        } catch (err) {
            console.log(err);
            throw err; 
        }
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Employee)
    async updateEmployee(@Arg('userId') userId: string, @Arg('data') data: updateEmployeeInput) {
        try {
            const employee = await Employee.findOne({ where: {user: userId}});
            if (!employee)
                throw new UserInputError('ユーザーが見つかりません！');
            
            const updatedEmployee = Object.assign(employee, data);

            await updatedEmployee.save();

            return updatedEmployee;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    @UseMiddleware(isAuth)
    @Mutation(() => String)
    async deleteEmployee(@Arg('userId') userId: string) {
        try {
            const employee = await Employee.findOne({ where: {user: userId}});
            if (!employee)
                throw new UserInputError('ユーザーが見つかりません！');
            
            await employee.remove();

            return '社員情報の削除に成功しました！';
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}