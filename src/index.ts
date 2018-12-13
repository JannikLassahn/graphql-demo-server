import { ApolloServer, PubSub } from 'apollo-server';

let counter = 0;

const CHANNEL = 'COUNTER_CHANNEL';

const typeDefs = `
  type Query {
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

const pubsub = new PubSub();
const server = new ApolloServer({ typeDefs, resolvers, context: { pubsub } });
server.listen().then(({ url }) => console.log(`Server is running on ${url}`));