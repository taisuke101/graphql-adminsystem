
export const employeeResolvers = {
    Query: {
        getEmployees: async(_, __, { dataSources }: any) => {
            return await dataSources.EmployeeAPI.getEmployees();
        },
        getEmployee: async(_, { uuid }: any, { dataSources }: any) => {
            return await dataSources.EmployeeAPI.getEmployee(uuid);
        },
    },
    Mutation: {
        createEmployee: async(_,
            {
                employeeInput: {
                    userUuid,
                    employeeCode,
                    lastName,
                    firstName,
                    lastKanaName,
                    firstKanaName,
                    gender,
                    birthDay,
                    hireDate
                }
            }: any,
            { dataSources }: any) =>
        {
            return await dataSources.EmployeeAPI.createEmployee(
                userUuid,
                employeeCode,
                lastName,
                firstName,
                lastKanaName,
                firstKanaName,
                gender,
                birthDay,
                hireDate
            )
        },
        updateEmployee: async(_,
            {
                employeeInput: {
                    uuid,
                    employeeCode,
                    lastName,
                    firstName,
                    lastKanaName,
                    firstKanaName,
                    gender,
                    birthDay,
                    hireDate
                }
            }: any, 
            {dataSources}: any) => 
        {
            return await dataSources.EmployeeAPI.updateEmployee(
                uuid,
                employeeCode,
                lastName,
                firstName,
                lastKanaName,
                firstKanaName,
                gender,
                birthDay,
                hireDate
            )
        },
        deleteEmployee: async (_, { uuid }: any, { dataSources }: any) => {
            return await dataSources.EmployeeAPI.deleteEmployee(uuid);
        }
    }
}