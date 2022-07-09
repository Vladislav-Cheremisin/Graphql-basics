import { ApolloServer } from "apollo-server";

import usersModel from "./modules/users/users.model";

const typeDefs = [usersModel.typeDefs];

const resolvers = [usersModel.resolvers];

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
