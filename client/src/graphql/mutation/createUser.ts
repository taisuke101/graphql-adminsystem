import { gql } from '@apollo/client';

export const CREATE_USER_QUERY = gql`
    mutation(
            $userId: String!, 
            $password: String!, 
            $confirmPassword: String!
    ) {
            createUser(
                userId: $userId,
                password: $password,
                confirmPassword: $confirmPassword
            ) {
                userId
                password
            }
        }
`