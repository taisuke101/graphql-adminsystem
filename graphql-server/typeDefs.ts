import { gql } from 'apollo-server';

const typeDefs = gql`
    type User {
        uuid: String!
        userId: ID!
        password: String!
        employee: [Employee]
        section: [Section]
        createDatetime: String!
        updateDatetime: String!
    }
    
    type Employee {
        uuid: String!
        employeeCode: ID!
        user: User!
        lastName: String!
        firstName: String!
        lastKanaName: String!
        firstKanaName: String!
        gender: String!
        birthDay: String!
        hireDate: String!
        createDatetime: String!
        updateDatetime: String!
    }

    type Section {
        uuid: String!
        user: User!
        sectionCode: ID!
        sectionName: String!
        createDatetime: String!
        updateDatetime: String!
    }

    type LoginUser {
        uuid: String!
        userId: String!
        password: String!
        token: String!
    }

    input EmployeeInput {
        uuid: String
        userUuid: String
        employeeCode: String
        lastName: String
        firstName: String
        lastKanaName: String
        firstKanaName: String
        gender: String
        birthDay: String
        hireDate: String
    }

    type Query {
        getUsers: [User]!
        getUser(uuid: String!): User! 
        getEmployees: [Employee]
        getEmployee(employeeCode: String!): Employee!
        getSections: [Section]!
        getSection(uuid: String!): Section!
    }

    type Mutation {
        loginUser(userId: String!, password: String!): LoginUser!
        createUser(userId: String!, password: String!, confirmPassword: String!): User!
        updateUser(uuid: String!, userId: String!, password: String!): User!
        deleteUser(uuid: String!): User!
        createEmployee(
            userUuid: String!
            employeeCode: String!
            lastName: String!
            firstName: String!
            lastKanaName: String!
            firstKanaName: String!
            gender: String
            birthDay: String
            hireDate: String
        ): Employee!
        updateEmployee(
            userEmployeeCode: String!
            employeeCode: String
            lastName: String
            firstName: String
            firstKanaName: String
            lastKanaName: String
            gender: String
            birthDay: String
            hireDate: String
        ): Employee!
        deleteEmployee(employeeCode: String!): Employee!
        createSection(userUuid: String, sectionCode: String, sectionName: String): Section!
        updateSection(userSectionCode: String!, sectionCode: String, sectionName: String): Section!
        deleteSection(sectionCode: String!): Section!
    }
`

export default typeDefs;