import { Field, ObjectType } from "type-graphql";
import { BeforeInsert, Column, Entity, OneToMany } from "typeorm";
import bcrypt from 'bcrypt';

import { Section } from "./Section";
import { Employee } from "./Employee";
import Model from "./Model";

@ObjectType()
@Entity('users')
export class User extends Model {
    static password: any;
    constructor(user: Partial<User>) {
        super()
        Object.assign(this, user)
    }

    @Field(() => String!)
    @Column('varchar', { length: 24 , unique: true })
    userId: string;

    @Field(() => String!)
    @Column('varchar')
    userName: string;

    @Field(() => String!)
    @Column('varchar')
    password: string;

    @Field(() => [Employee])
    @OneToMany(() => Employee, employee => employee.user)
    employee: Employee[];

    @Field(() => [Section])
    @OneToMany(() => Section, section => section.user)
    section: Section[];

    @Field(() => String)
    token: string;
    
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12)
    }

}