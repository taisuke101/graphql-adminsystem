import { gql } from '@apollo/client';

export const DELETE_EMPLOYEE_MUTATION = gql`
    mutation($userId: String!) {
        deleteEmployee(userId: $userId) 
    }
`