import { gql } from '@apollo/client';

export const CREATE_EMPLOYEE_MUTATION = gql`
    mutation (
        $userUuid: String
        $employeeCode: String
        $lastName: String
        $firstName: String
        $lastKanaName: String
        $firstKanaName: String
        $gender: String
        $birthDay: String
        $hireDate: String
    ) {
        createEmployee (
            userUuid: $userUuid,
            employeeCode: $employeeCode,
            lastName: $lastName,
            firstName: $firstName,
            lastKanaName: $lastKanaName,
            firstKanaName: $firstKanaName,
            gender: $gender,
            birthDay: $birthDay,
            hireDate: $hireDate,
        ) {
            uuid
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