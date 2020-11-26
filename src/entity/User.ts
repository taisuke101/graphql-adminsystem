import { Length } from "class-validator";
import { Column, Entity, OneToMany } from "typeorm";
import { Employee } from "./Employee";

import Model from "./Model";
import { Section } from "./Section";

@Entity('users')
export class User extends Model {

    @Column('varchar', { length: 24 , unique: true })
    @Length(1, 24)
    userId: string;

    @Column('varchar')
    password: string;

    @OneToMany(() => Employee, employee => employee.user)
    employee: Employee[];

    @OneToMany(() => Section, section => section.user)
    section: Section[];
}