import { gql } from '@apollo/client';

export const UPDATE_EMPLOYEE_MUTATION = gql`
    mutation(
        $userId: String!
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
            userId: $userId
            data: {
                employeeCode: $employeeCode
                lastName: $lastName
                firstName: $firstName
                lastKanaName: $lastKanaName
                firstKanaName: $firstKanaName
                gender: $gender
                birthDay: $birthDay
                hireDate: $hireDate
            }
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