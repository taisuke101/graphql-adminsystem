import 'reflect-metadata';
import { createConnection } from "typeorm";
import express from 'express';
import { ArgumentValidationError, buildSchema } from 'type-graphql';
import { ApolloError, ApolloServer, UserInputError } from 'apollo-server-express';
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
        formatError: (err: any) => {
            if (err.originalError instanceof ApolloError) {
                return err;
            }
            if (err.originalError instanceof ArgumentValidationError) {
                const errorMessage = err.extensions?.exception.validationErrors
                const obj = errorMessage.map((e: { property: string, constraints: string}) => (
                    { [e.property] : Object.values(e.constraints) }
                ))
                const errors = obj.reduce((result: string[], current: string[]) => {
                    let key: any= Object.keys(current);
                    result[key] = current[key]
                    return result
                }, {})
                throw new UserInputError('Errors', { errors })
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
