
export const sectionResolvers = {
    Mutation: {
        createSection: async(
            _, 
            { userUuid, sectionCode, sectionName }: any, 
            { dataSources }: any) => 
        {
            return await dataSources.SectionAPI.createSection(
                userUuid, sectionCode, sectionName
            );
        },
        updateSection: async(
            _,
            { userSectionCode, sectionCode, sectionName }: any,
            { dataSources }: any
        ) => 
        {
            return await dataSources.SectionAPI.updateSection(
                userSectionCode, sectionCode, sectionName
            );
        },
        deleteSection: async(
            _,
            { sectionCode }: any,
            { dataSources }: any
        ) => 
        {
            return await dataSources.SectionAPI.deleteSection(sectionCode);
        }
    }
}