import { gql } from '@apollo/client';

export const DELETE_SECTION_MUTATION = gql`
    mutation($sectionCode: String!) {
        deleteSection(sectionCode: $sectionCode) {
            sectionCode
        }
    }
`