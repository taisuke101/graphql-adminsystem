import { gql } from '@apollo/client';

export const FETCH_USER_QUERY = gql`
    query {
        getUsers {
            userId
            employee {
                lastKanaName
                firstKanaName
            }
            
        }
    }
`