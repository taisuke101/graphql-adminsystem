import { UserInputError } from "apollo-server-express";
import { Arg, Mutation, Query, Resolver, UseMiddleware} from "type-graphql";
import { User } from "../entity/User";
import bcrypt from 'bcrypt'; 

import { createUserInput, updateUserInput } from "../inputs/UserInput";
import { validateUserInput } from "../utils/validators";

@Resolver()
export class UserResolver {
    @Query(() => [User])
    async getUsers() {
        const user = await User.find({ relations: ['section', 'employee']});
        console.log(user);
        return user;
    }

    @UseMiddleware()
    @Query(() => User)
    async getUser(@Arg('userId') userId: string) {
        try {
            const user = await User.findOne({ userId }, { relations: ['section', 'employee']});
            if (!user)
                throw new UserInputError('ユーザーが見つかりません！');
            return user;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    @Mutation(() => User)
    async createUser(@Arg('data') data: createUserInput) {
        try {
            const { userId, password, confirmPassword } = data;
            
            const { valid, errors } = validateUserInput(userId, password, confirmPassword);
            
            if (!valid)
                throw new UserInputError('Errors', { errors })


            const userisTaken = await User.findOne({ userId })
            if (userisTaken) 
                throw new UserInputError('すでに存在しているユーザーIDです！')

            const user =  User.create({
                userId,
                password
            })

            await user.save();

            return user;

        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    @Mutation(() => User)
    async updateUser(@Arg('userId') userId: string, @Arg('data') data: updateUserInput) {
        try {   
            const user = await User.findOne({ userId });
            if (!user) 
                throw new UserInputError('ユーザーが見つかりません！');

            const userIdIsTaken = await User.findOne(data.userId);
            if (userIdIsTaken) 
                throw new UserInputError('すでに存在しているユーザーIDに変更できません！')
            
            if (data.password !== data.confirmPassword)
                throw new UserInputError('パスワードが一致しません！')

            const updatedUser = Object.assign(user, data)
            
            const hashPassword = await bcrypt.hash(data.password, 12)
            
            updatedUser.password = hashPassword;

            await updatedUser.save();

            return updatedUser;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    @Mutation(() => String)
    async deleteUser(@Arg('userId') userId: string) {
        try {
            const user = await User.findOne({ userId });
            if (!user) 
                throw new UserInputError('ユーザーが見つかりません！');
            
            await user.remove();
            return 'ユーザーの削除に成功しました！';

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}