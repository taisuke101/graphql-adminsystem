import { UserInputError } from "apollo-server-express";
import { Arg, Query, Resolver } from "type-graphql";
import bcrypt from 'bcrypt';

import { User } from "../entity/User";
import { LoginInput } from "../inputs/AuthInput";
import { generateToken } from "../utils/generateToken";

@Resolver()
export class AuthResolver {
    @Query(() => User)
    async Login(@Arg('data') data: LoginInput) {
        try {
            const { userId, password } = data;
            const user = await User.findOne({ userId });
            if (!user)
                throw new UserInputError('ユーザーが見つかりません！');
            
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                throw new Error('登録情報と一致しません！')
            }

            const token = generateToken(user);

            return ({
                ...user,
                token
            })

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}
