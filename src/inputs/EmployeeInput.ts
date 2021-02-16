import { IsEnum } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class createEmployeeInput {
    @Field()
    employeeCode: string;

    @Field()
    lastName: string;

    @Field()
    firstName: string;

    @Field({ nullable: true })
    lastKanaName?: string;

    @Field({ nullable: true })
    firstKanaName?: string;

    @Field()
    @IsEnum(['男', '女', '未設定', undefined])
    gender: string;

    @Field({ nullable: true })
    birthDay?: Date;

    @Field({ nullable: true })
    hireDate?: Date;
}

@InputType()
export class updateEmployeeInput {
    @Field({ nullable: true })
    employeeCode?: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastKanaName?: string;

    @Field({ nullable: true })
    firstKanaName?: string;

    @Field({ nullable: true })
    @IsEnum(['男', '女', '未設定', undefined])
    gender?: string;

    @Field({ nullable: true })
    birthDay?: Date;

    @Field({ nullable: true })
    hireDate?: Date;
}