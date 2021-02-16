import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation(
        $userId: String! 
        $password: String!
    ) {
        Login(
            data: {
                userId: $userId
                password: $password
            }
        ) {
            uuid
            userId
            password
            token
        }
    }
`