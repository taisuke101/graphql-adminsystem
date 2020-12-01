import { gql } from '@apollo/client';

export const FETCH_USER_QUERY = gql`
    query {
        getUsers {
            uuid
            userId
            employee {
                lastKanaName
                firstKanaName
            }
            
        }
    }
`