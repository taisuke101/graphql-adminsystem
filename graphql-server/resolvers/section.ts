
export const sectionResolvers = {
    Query: {
        getSections: async(_, __, { dataSources }: any) => {
            return await dataSources.SectionAPI.getSections();
        },
        getSection: async(_, { uuid }: any, { dataSources }: any) => {
            return await dataSources.SectionAPI.getSection(uuid)
        }
    },
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
            { uuid, sectionCode, sectionName }: any,
            { dataSources }: any
        ) => 
        {
            return await dataSources.SectionAPI.updateSection(
                uuid, sectionCode, sectionName
            );
        },
        deleteSection: async(
            _,
            { uuid }: any,
            { dataSources }: any
        ) => 
        {
            return await dataSources.SectionAPI.deleteSection(uuid);
        }
    }
}