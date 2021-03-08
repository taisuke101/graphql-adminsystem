import { IsEnum, IsNotEmpty, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class createEmployeeInput {
    @Field()
    @IsNotEmpty({ message: '社員コードは必須項目です！' })
    @MaxLength(5, { message: '5文字以内に収めて下さい！'})
    employeeCode: string;

    @Field()
    @IsNotEmpty({ message: '名字は必須項目です！' })
    @MaxLength(16, { message: '16文字以内に収めて下さい！'})
    lastName: string;

    @Field()
    @IsNotEmpty({ message: '名前は必須項目です！' })
    @MaxLength(16, { message: '16文字以内に収めて下さい！'})
    firstName: string;

    @Field({ nullable: true })
    @MaxLength(24, { message: '24文字以内に収めて下さい！'})
    lastKanaName?: string;

    @Field({ nullable: true })
    @MaxLength(24, { message: '24文字以内に収めて下さい！'})
    firstKanaName?: string;

    @Field()
    @IsEnum(['男', '女', '未設定', undefined], {message: '設定した値から選択して下さい！'})
    gender: string;

    @Field({ nullable: true })
    birthDay?: string;

    @Field({ nullable: true })
    hireDate?: string;
}

@InputType()
export class updateEmployeeInput {
    @Field({ nullable: true })
    @MaxLength(5, { message: '5文字以内に収めて下さい！'})
    employeeCode?: string;

    @Field({ nullable: true })
    @MaxLength(16, { message: '16文字以内に収めて下さい！'})
    lastName?: string;

    @Field({ nullable: true })
    @MaxLength(16, { message: '16文字以内に収めて下さい！'})
    firstName?: string;

    @Field({ nullable: true })
    @MaxLength(24, { message: '24文字以内に収めて下さい！'})
    lastKanaName?: string;

    @Field({ nullable: true })
    @MaxLength(24, { message: '24文字以内に収めて下さい！'})
    firstKanaName?: string;

    @Field({ nullable: true })
    @IsEnum(['男', '女', '未設定', undefined], {message: '設定した値から選択して下さい！'})
    gender?: string;

    @Field({ nullable: true })
    birthDay?: string;

    @Field({ nullable: true })
    hireDate?: string;
}