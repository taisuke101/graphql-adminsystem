import { gql } from '@apollo/client';

export const DELETE_SECTION_MUTATION = gql`
    mutation($userId: String!) {
        deleteSection(userId: $userId) 
    }
`