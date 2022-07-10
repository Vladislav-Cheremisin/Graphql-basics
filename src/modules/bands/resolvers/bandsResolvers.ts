import bandsServices from "../services/bandsServices";

const bandsResolvers = {
  Query: {
    band: bandsServices.getBand,
  },
  Mutation: {},
};

export { bandsResolvers };
