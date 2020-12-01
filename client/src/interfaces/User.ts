import { EmployeeProps } from './Employee';
import { SectionProps } from './Section'

export interface UserProps {
    uuid: string;
    userId: string;
    password: string;
    employee?: EmployeeProps[];
    section?: SectionProps[];
    createDatetime: string;
    updateDatetime: string;
}