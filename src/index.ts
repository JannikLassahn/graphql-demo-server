import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server';
import * as fs from 'fs';

import resolvers from './schema';
import Movie from './data/movie';
import Actor from './data/actor';

import config from './config';
import connectToDatabase from './data/context';
import { movieLoader, actorLoader } from './loaders';

const start = async () => {
    await connectToDatabase(config.db.connectionString);

    const typeDefs = gql(fs.readFileSync(`${__dirname}/schema/schema.gql`, 'utf8'));
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    });

    const server = new ApolloServer({
        schema,
        context: () => {
            return {
                loaders: {
                    movieLoader: movieLoader(),
                    actorLoader: actorLoader()
                },
                Movie,
                Actor
            }
        }
    });
    const { url } = await server.listen({
        port: config.server.port
    });

    console.log(`Server is running on ${url}`)
}

start().catch(error => console.error(error));