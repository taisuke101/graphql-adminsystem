import { IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {
    @Field()
    @IsNotEmpty({ message: 'ユーザーIDは必須項目です！' })
    userId: string;

    @Field()
    @IsNotEmpty({ message: 'パスワードは必須項目です！' })
    password: string;
}