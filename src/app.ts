import { ApolloServer, gql } from "apollo-server";

import usersData from "./modules/users/users";
import artistsData from "./modules/artists/artists";

const typeDefs = [usersData.typeDefs, artistsData.typeDefs];

const resolvers = [usersData.resolvers, artistsData.resolvers];

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
