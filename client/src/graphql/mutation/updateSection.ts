import { gql } from '@apollo/client';

export const UPDATE_SECTION_MUTATION = gql`
    mutation (
        $userId: String!
        $sectionCode: String
        $sectionName: String
    ) {
        updateSection (
            userId: $userId
            data: {
                sectionCode: $sectionCode
                sectionName: $sectionName
            }
        ) {
            sectionCode
            sectionName
        }
    }
`