import { bandsSchema } from "./schemas/bandsSchema";
import { bandsResolvers } from "./resolvers/bandsResolvers";

const bandsData = {
  typeDefs: bandsSchema,
  resolvers: bandsResolvers,
};

export default bandsData;
