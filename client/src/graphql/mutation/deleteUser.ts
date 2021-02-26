import { gql } from '@apollo/client';

export const DELETE_USER_MUTATION = gql`
    mutation ($userId: String!) {
        deleteUser(userId: $userId)
    }
`