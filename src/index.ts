import 'reflect-metadata';
import { createConnection } from "typeorm";
import express from 'express';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';

import { HelloResolver } from './resolvers/HelloResolver';
import { UserResolver } from './resolvers/UserResolver';

// apollo-server-express への変更
// TODO EntityにTypegraphqlのスキーマを追加
// TODO EntityのBeforeInsertにパスワードのハッシュ化を追加
// TODO EntityのクラスバリデータをTypegraphqlのインプット部分に移行
// TODO ControllerをGraphqlのリゾルバに変更

async function main() {
    await createConnection();
    const schema = await buildSchema({
        resolvers: [
            HelloResolver,
            UserResolver
        ]
    });
    const server = new ApolloServer({ 
        schema,
        context: ({ req, res }: any) => ({ req, res }) 
    });
    const app = express();
    server.applyMiddleware({app})
    
    app.listen({ port: process.env.PORT }, () => 
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    )
}

main();
