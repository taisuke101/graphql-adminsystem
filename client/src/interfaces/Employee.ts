import { UserProps } from './User';

export interface EmployeeProps {
    uuid?: string;
    employeeCode?: string;
    user: UserProps[];
    lastName?: string;
    firstName?: string;
    lastKanaName?: string;
    firstKanaName?: string;
    gender?: string;
    birthDay?: string;
    hireDate?: string;
    createDatetime?: string;
    updateDatetime?: string;
}