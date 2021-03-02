import 'reflect-metadata';
import { createConnection } from "typeorm";
import express from 'express';
import { buildSchema } from 'type-graphql';
import { ApolloServer, UserInputError } from 'apollo-server-express';
import cors from 'cors';

import { UserResolver } from './resolvers/UserResolver';
import { AuthResolver } from './resolvers/AuthResolver';
import { SectionResolver } from './resolvers/SectionResolver';
import { EmployeeResolver } from './resolvers/EmployeeResolver';
import { ExpressType } from './types/ExpressType';

async function main() {
    await createConnection();
    const schema = await buildSchema({
        resolvers: [
            UserResolver,
            SectionResolver,
            EmployeeResolver,
            AuthResolver,
        ]
    });
    const server = new ApolloServer({ 
        schema,
        formatError: (err) => {
            if (err.message.includes('Argument Validation Error')) {
                return new UserInputError('bad user input', {
                    detail: err.extensions?.exception.validationErrors
                })
            }
            return err;
        },
        context: ({ req, res }: ExpressType) => ({ req, res }) 
    });
    const app = express();

    app.use(express.json());
    app.use(cors({
        credentials: true,
        origin: 'http://localhost:3000'
    }));


    server.applyMiddleware({app})
    
    app.listen({ port: process.env.PORT }, () => 
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    )
}

main();
