import { gql } from '@apollo/client';

export const DELETE_USER_MUTATION = gql`
    mutation ($uuid: String!) {
        deleteUser(uuid: $uuid) {
            uuid
            userId
        }
    }
`