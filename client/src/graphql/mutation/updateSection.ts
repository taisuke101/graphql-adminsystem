import { gql } from '@apollo/client';

export const UPDATE_SECTION_MUTATION = gql`
    mutation (
        $userSectionCode: String!
        $sectionCode: String!
        $sectionName: String!
    ) {
        updateSection (
            userSectionCode: $userSectionCode
            sectionCode: $sectionCode
            sectionName: $sectionName
        ) {
            sectionCode
            sectionName
        }
    }
`