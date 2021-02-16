import { gql } from '@apollo/client';

export const FETCH_USER_DETAIL_QUERY = gql`
    query($userId: String!){
        getUser(userId: $userId) {
            uuid
            userId
            password
            employee {
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
            section {
                uuid
                sectionCode
                sectionName
            }
        }
    }
`