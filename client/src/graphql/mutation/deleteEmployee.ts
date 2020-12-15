import { gql } from '@apollo/client';

export const DELETE_EMPLOYEE_MUTATION = gql`
    mutation($employeeCode: String!) {
        deleteEmployee(employeeCode: $employeeCode) {
            employeeCode
        }
    }
`