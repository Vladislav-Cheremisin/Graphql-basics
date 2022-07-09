import { favouritesSchema } from "./schemas/favouritesSchema";
import { favouritesResolvers } from "./resolvers/favouritesResolvers";

const favouritesData = {
  typeDefs: favouritesSchema,
  resolvers: favouritesResolvers,
};

export default favouritesData;
