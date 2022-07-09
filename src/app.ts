import { ApolloServer } from "apollo-server";

import { typeDefs, resolvers } from "./gatewaySchema";

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
