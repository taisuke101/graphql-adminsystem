import { IsEnum, Length } from "class-validator";
import {Entity, Column, ManyToOne} from "typeorm";

import Model from "./Model";

import { User } from "./User";

@Entity('employees')
export class Employee extends Model {

    @Column('char', { length: 5, unique: true })
    @Length(1, 5)
    employeeCode: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;

    @Column('varchar', { length: 16 })
    @Length(1, 16)
    lastName: string;

    @Column('varchar', { length: 16 })
    @Length(1, 16)
    firstName: string;

    @Column('varchar', { length: 24 })
    @Length(1, 24)
    lastKanaName?: string;

    @Column('varchar', { length: 24 })
    @Length(1, 24)
    firstKanaName?: string;

    @Column({
        type: 'enum',
        enum: ['男', '女', '未設定'],
        default: '未設定'
    })
    @IsEnum(['男', '女', '未設定', undefined])
    gender: string;

    @Column()
    birthDay?: Date;

    @Column()
    hireDate?: Date;

}
