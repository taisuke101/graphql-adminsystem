import 'reflect-metadata';
import { createConnection } from "typeorm";
import express from 'express';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';

import { UserResolver } from './resolvers/UserResolver';
import { AuthResolver } from './resolvers/AuthResolver';
import { SectionResolver } from './resolvers/SectionResolver';

// apollo-server-express への変更
// EntityにTypegraphqlのスキーマを追加
// EntityのBeforeInsertにパスワードのハッシュ化を追加
// TODO EntityのクラスバリデータをTypegraphqlのインプット部分に移行
// TODO ControllerをGraphqlのリゾルバに変更

async function main() {
    await createConnection();
    const schema = await buildSchema({
        resolvers: [
            UserResolver,
            SectionResolver,
            AuthResolver,
        ]
    });
    const server = new ApolloServer({ 
        schema,
        context: ({ req, res }: any) => ({ req, res }) 
    });
    const app = express();

    app.use(express.json());

    server.applyMiddleware({app})
    
    app.listen({ port: process.env.PORT }, () => 
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    )
}

main();
