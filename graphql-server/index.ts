import { ApolloServer } from 'apollo-server';

import typeDefs from './typeDefs';
import { resolvers } from './resolvers/index';
import { UserAPI } from './class/UserAPI';
import { EmployeeAPI } from './class/EmployeeAPI';
import { SectionAPI } from './class/SectionAPI';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
    dataSources: () => {
        return {
            UserAPI: new UserAPI(),
            EmployeeAPI: new EmployeeAPI(),
            SectionAPI: new SectionAPI()
        }
    }
})

server.listen({ port: 4000 })
    .then(({url}) => {
        console.log(`🚀  Server ready at ${url}`);
    }) 