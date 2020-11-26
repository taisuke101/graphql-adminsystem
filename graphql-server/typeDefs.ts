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
        getEmployee(uuid: String!): Employee!
        getSections: [Section]!
        getSection(uuid: String!): Section!
    }

    type Mutation {
        loginUser(userId: String!, password: String!): LoginUser!
        createUser(userId: String!, password: String!, confirmPassword: String!): User!
        updateUser(uuid: String!, userId: String!, password: String!): User!
        deleteUser(uuid: String!): User!
        createEmployee(employeeInput: EmployeeInput): Employee!
        updateEmployee(employeeInput: EmployeeInput): Employee!
        deleteEmployee(uuid: String!): Employee!
        createSection(userUuid: String!, sectionCode: String!, sectionName: String!): Section!
        updateSection(uuid: String!, sectionCode: String!, sectionName: String!): Section!
        deleteSection(uuid: String!): Section!
    }
`

export default typeDefs;