import { gql } from '@apollo/client';

export const UPDATE_EMPLOYEE_MUTATION = gql`
    mutation(
        $userEmployeeCode: String!
        $employeeCode: String
        $lastName: String
        $firstName: String
        $firstKanaName: String
        $lastKanaName: String
        $gender: String
        $birthDay: String
        $hireDate: String
    ) {
        updateEmployee (
            userEmployeeCode: $userEmployeeCode
            employeeCode: $employeeCode
            lastName: $lastName
            firstName: $firstName
            lastKanaName: $lastKanaName
            firstKanaName: $firstKanaName
            gender: $gender
            birthDay: $birthDay
            hireDate: $hireDate
        ) {
            employeeCode
            lastName
            firstName
            lastKanaName
            firstKanaName
            gender
            birthDay
            hireDate
        }
    }
`