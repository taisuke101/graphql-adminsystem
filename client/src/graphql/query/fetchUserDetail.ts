import { gql } from '@apollo/client';

export const FETCH_USER_DETAIL_QUERY = gql`
    query($uuid: String!){
        getUser(uuid: $uuid) {
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