import { RESTDataSource } from "apollo-datasource-rest"

export class UserAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:5000';
    }

    async getUsers() {
        const data = await this.get('/users');
        return data;
    }

    async getUser(uuid: string) {
        const data = await this.get(`/users/${uuid}`);
        return data;
    }

    async createUser(userId: string, password: string, confirmPassword: string) {
        const data = await this.post('/users', { userId, password, confirmPassword });
        return data;
    }
    
    async updateUser(uuid: string, userId: string, password: string) {
        const data = await this.put(`/users/${uuid}`, { userId, password });
        return data;
    }

    async deleteUser(uuid: string) {
        const data = await this.delete(`/users/${uuid}`);
        return data;
    }

    async loginUser(userId: string, password: string) {
        const data = await this.post('/login', { userId, password });
        return data;
    }
}