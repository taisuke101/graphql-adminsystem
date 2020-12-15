import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest'

export class SectionAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:5000';
    }

    async createSection( 
        userUuid: string,
        sectionCode: string,
        sectionName: string
        ) {
        const data = await this.post(`/sections/${userUuid}`, 
        {sectionCode, sectionName});
        return data;
    }

    async updateSection(
        uuid: string,
        sectionCode: string,
        sectionName: string
        ) {
        const data = await this.put(`/sections/${uuid}`, 
        { sectionCode, sectionName });
        return data;
    }

    async deleteSection(uuid: string) {
        const data = await this.delete(`/sections/${uuid}`);
        return data;
    }
}