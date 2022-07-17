import { artistsSchema } from "./schemas/artistsSchema";
import { artistsResolvers } from "./resolvers/artistsResolvers";

const artistsData = {
  typeDefs: artistsSchema,
  resolvers: artistsResolvers,
};

export default artistsData;
