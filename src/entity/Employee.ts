import { IsEnum, Length } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import {Entity, Column, ManyToOne, JoinColumn} from "typeorm";

import Model from "./Model";

import { User } from "./User";

@ObjectType()
@Entity('employees')
export class Employee extends Model {

    @Field(() => String!)
    @Column('char', { length: 5, unique: true })
    @Length(1, 5)
    employeeCode: string;

    @Field(() => User)
    @ManyToOne(() => User,user => user.employee, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
    user: User;

    @Field(() => String!)
    @Column('varchar', { length: 16 })
    @Length(1, 16)
    lastName: string;

    @Field(() => String!)
    @Column('varchar', { length: 16 })
    @Length(1, 16)
    firstName: string;

    @Field(() => String)
    @Column('varchar', { length: 24, nullable: true } )
    @Length(1, 24)
    lastKanaName: string;

    @Field(() => String)
    @Column('varchar', { length: 24, nullable: true })
    @Length(1, 24)
    firstKanaName: string;

    @Field(() => String!)
    @Column({
        type: 'enum',
        enum: ['男', '女', '未設定'],
        default: '未設定'
    })
    @IsEnum(['男', '女', '未設定', undefined])
    gender: string;

    @Field(() => String)
    @Column({ nullable: true, default: '未設定' })
    birthDay: string;

    @Field(() => String)
    @Column({ nullable: true, default: '未設定' })
    hireDate: string;

}
