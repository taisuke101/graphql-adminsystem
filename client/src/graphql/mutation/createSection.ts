import { gql } from '@apollo/client';

export const CREATE_SECTION_MUTATION = gql`
    mutation(
        $userId: String!
        $sectionCode: String!
        $sectionName: String!
    ) {
        createSection(
            userId: $userId,
            data: {
                sectionCode: $sectionCode,
                sectionName: $sectionName,
            }
        ) {
            sectionCode
            sectionName
        }
    }
`