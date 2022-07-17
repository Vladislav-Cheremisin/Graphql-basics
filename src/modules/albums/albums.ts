import { albumsSchema } from "./schemas/albumsSchema";
import { albumsResolvers } from "./resolvers/albumsResolvers";

const albumsData = {
  typeDefs: albumsSchema,
  resolvers: albumsResolvers,
};

export default albumsData;
