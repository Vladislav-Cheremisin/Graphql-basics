import { genresSchema } from "./schemas/genresSchema";
import { genresResolvers } from "./resolvers/genresResolvers";

const genresData = {
  typeDefs: genresSchema,
  resolvers: genresResolvers,
};

export default genresData;
