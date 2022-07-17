import { usersSchema } from "./schemas/usersSchema";
import { usersResolvers } from "./resolvers/usersResolvers";

const usersData = {
  typeDefs: usersSchema,
  resolvers: usersResolvers,
};

export default usersData;
