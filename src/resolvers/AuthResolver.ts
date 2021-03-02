import { AuthenticationError, UserInputError } from "apollo-server-express";
import { Arg, Mutation, Resolver } from "type-graphql";
import bcrypt from 'bcrypt';

import { User } from "../entity/User";
import { LoginInput } from "../inputs/AuthInput";
import { generateToken } from "../utils/generateToken";
import { validateLoginInput } from "../utils/userValidators";

@Resolver()
export class AuthResolver {
    @Mutation(() => User)
    async Login(@Arg('data') data: LoginInput) {
        try {
            const { userId, password } = data;

            const { valid, errors } = validateLoginInput(userId, password);

            if (!valid)
                throw new UserInputError('Errors', { errors });

            const user = await User.findOne({ userId });
            if (!user)
                throw new UserInputError('ユーザーが見つかりません！');
            
            const match = await bcrypt.compare(password, user.password);
            if (!match) 
                throw new AuthenticationError('登録情報と一致しません！')

            const token = generateToken(user);

            return ({
                ...user,
                token
            });

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}
