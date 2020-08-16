const { PrismaClient } = require("@prisma/client");
const { GraphQLServer, PubSub } = require("graphql-yoga");

const prisma = new PrismaClient();
const pubsub = new PubSub();

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Subscription = require("./resolvers/Subscription");
const Vote = require("./resolvers/Vote");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Vote,
  User,
  Link,
};

const server = new GraphQLServer({
  typeDefs: "src/schema.graphql",
  resolvers,
  context: (req) => ({ ...req, prisma, pubsub }),
});

server.start(() => console.log("Server is running on http://localhost:4000"));
