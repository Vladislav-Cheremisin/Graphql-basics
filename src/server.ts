import { ApolloServer, gql } from "apollo-server";

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
});

const startApolloServer = (): void => {
  server.listen(process.env.APOLLO_SERVER_PORT).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

export default startApolloServer;
