import { tracksSchema } from "./schemas/tracksSchema";
import { tracksResolvers } from "./resolvers/tracksResolvers";

const tracksData = {
  typeDefs: tracksSchema,
  resolvers: tracksResolvers,
};

export default tracksData;
