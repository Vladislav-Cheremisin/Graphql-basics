import { ApolloServer } from "apollo-server";

import usersData from "./modules/users/users";

const typeDefs = [usersData.typeDefs];

const resolvers = [usersData.resolvers];

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
