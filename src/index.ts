import { ApolloServer, PubSub, makeExecutableSchema } from 'apollo-server';

let counter = 0;

const CHANNEL = 'COUNTER_CHANNEL';

const typeDefs = `
  type Query {
    counter: Int!
    hello(name: String): String!
  }
  type Mutation {
    incrementCounter(by: Int): Int!
  }
  type Subscription {
    counter: Int!
  }
`
const resolvers = {
  Query: {
    counter: () => counter,
    hello: (_, { name }) => `Hello ${name || 'World'}!`,
  },
  Mutation: {
    incrementCounter: (_, { by }, { pubsub }) => {
      counter += by;
      pubsub.publish(CHANNEL, { counter });
      return counter;
    }
  },
  Subscription: {
    counter: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(CHANNEL)
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const pubsub = new PubSub();
const server = new ApolloServer({ schema, context: { pubsub } });
server.listen().then(({ url }) => console.log(`Server is running on ${url}`));