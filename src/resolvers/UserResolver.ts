import { UserInputError } from "apollo-server-express";
import { Arg, Mutation, Query, Resolver, UseMiddleware} from "type-graphql";
import { User } from "../entity/User";
import bcrypt from 'bcrypt'; 

import { createUserInput, updateUserInput } from "../inputs/UserInput";
import { isAuth } from "../middleware/isAuth";

@Resolver()
export class UserResolver {
    @Query(() => [User])
    async getUsers() {
        const user = await User.find({ 
            order: {userId: 'ASC'}, 
            relations: ['section', 'employee'] 
        });
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

    @UseMiddleware(isAuth)
    @Mutation(() => User)
    async createUser(@Arg('data') data: createUserInput) {
        try {
            let errors: any = {};

            const { userId, userName, password } = data;
            
            const userisTaken = await User.findOne({ userId });

            if (userisTaken)
                errors.userIsTaken = 'すでに存在しているユーザーです！'

            if (Object.keys(errors).length > 0)
                throw new UserInputError('Errors', { errors })

            const user =  User.create({
                userId,
                userName,
                password
            });

            await user.save();

            return user;

        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    @UseMiddleware(isAuth)
    @Mutation(() => User)
    async updateUser(@Arg('userId') userId: string, @Arg('data') data: updateUserInput) {
        try {   
            const user = await User.findOne({ userId });
            if (!user) 
                throw new UserInputError(
                    "Errors",
                    { errors: { userId: 'ユーザーが見つかりません！'}}
                );

            const updatedUser = Object.assign(user, data);
            
            const hashPassword = await bcrypt.hash(data.password, 12);
            
            updatedUser.password = hashPassword;

            await updatedUser.save();

            return updatedUser;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    @UseMiddleware(isAuth)
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