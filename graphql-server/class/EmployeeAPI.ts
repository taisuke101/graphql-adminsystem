import { RESTDataSource } from 'apollo-datasource-rest';

export class EmployeeAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:5000'
    }

    async getEmployees() {
        const data = await this.get('/employees');
        return data;
    }

    async getEmployee(uuid: string) {
        const data = await this.get(`/employees/${uuid}`);
        return data;
    }
    
    async createEmployee(
        userUuid: string,
        employeeCode: string,
        lastName: string,
        firstName: string,
        lastKanaName: string,
        firstKanaName: string,
        gender: string,
        birthDay: string,
        hireDate: string
        ) {
        const data = await this.post('/employees',
        { 
            userUuid,
            employeeCode,
            lastName,
            firstName,
            lastKanaName,
            firstKanaName,
            gender,
            birthDay,
            hireDate
        });
        return data;
    }

    async updateEmployee(
        uuid: string,
        employeeCode: string,
        lastName: string,
        firstName: string,
        lastKanaName: string,
        firstKanaName: string,
        gender: string,
        birthDay: string,
        hireDate: string
        ) {
        const data = await this.put(`/employees/${uuid}`,
        { 
            employeeCode,
            lastName,
            firstName,
            lastKanaName,
            firstKanaName,
            gender,
            birthDay,
            hireDate
        }
        );
        return data;
    }

    async deleteEmployee(uuid: string) {
        const data = await this.delete(`/employees/${uuid}`);
        return data;
    }
}