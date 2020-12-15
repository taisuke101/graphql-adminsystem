import { gql } from '@apollo/client';

export const CREATE_SECTION_MUTATION = gql`
    mutation(
        $userUuid: String
        $sectionCode: String
        $sectionName: String
    ) {
        createSection(
            userUuid: $userUuid,
            sectionCode: $sectionCode,
            sectionName: $sectionName,
        ) {
            sectionCode
            sectionName
        }
    }
`