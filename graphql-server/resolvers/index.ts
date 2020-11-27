import { userResolves } from './user';
import { employeeResolvers } from './employee';
import { sectionResolvers } from './section';

export const resolvers = {
    Query: {
        ...userResolves.Query,
        ...employeeResolvers.Query,
        ...sectionResolvers.Query
    },
    Mutation: {
        ...userResolves.Mutation,
        ...employeeResolvers.Mutation,
        ...sectionResolvers.Mutation
    }
}