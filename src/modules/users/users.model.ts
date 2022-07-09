import { usersSchema } from "./schemas/usersSchema";
import { usersResolvers } from "./resolvers/usersResolvers";

const usersModel = {
  typeDefs: usersSchema,
  resolvers: usersResolvers,
};

export default usersModel;
