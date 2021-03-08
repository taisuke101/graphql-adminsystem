import { IsNotEmpty, MaxLength, ValidateIf } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Match } from "../decorators/Match";

@InputType()
export class createUserInput{
    @Field()
    @IsNotEmpty({ message: 'ユーザーIDは必須項目です！' })
    @MaxLength(24, { message: '24文字以内に収めて下さい！'})
    userId: string;

    @Field()
    @IsNotEmpty({ message: 'ユーザー名は必須項目です！' })
    @MaxLength(24, { message: '24文字以内に収めて下さい！'})
    userName: string;
    
    @Field()
    @IsNotEmpty({ message: 'パスワードは必須項目です！' })
    @MaxLength(32, { message: '32文字以内に収めて下さい！'})
    password: string;

    @Field()
    @Match('password', {message: 'パスワードが一致しません！'})
    confirmPassword: string;
}

@InputType()
export  class updateUserInput {
    @Field({ nullable: true })
    @MaxLength(24, { message: '24文字以内に収めて下さい！'})
    userName?: string;

    @Field({ nullable: true })
    @MaxLength(32, { message: '32文字以内に収めて下さい！'})
    password?: string;

    @Field({ nullable: true })
    @ValidateIf((user) => user.password !== null)
    @Match('password', {message: 'パスワードが一致しません！'})
    confirmPassword?: string;
}