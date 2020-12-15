
export const employeeResolvers = {
    Mutation: {
        createEmployee: async(_,
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
                userEmployeeCode,
                employeeCode,
                lastName,
                firstName,
                lastKanaName,
                firstKanaName,
                gender,
                birthDay,
                hireDate
            }: any, 
            {dataSources}: any) => 
        {
            return await dataSources.EmployeeAPI.updateEmployee(
                userEmployeeCode,
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
        deleteEmployee: async (_, { employeeCode }: any, { dataSources }: any) => {
            return await dataSources.EmployeeAPI.deleteEmployee(employeeCode);
        }
    }
}