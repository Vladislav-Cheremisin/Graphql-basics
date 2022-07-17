import bandsServices from "../services/bandsServices";

const bandsResolvers = {
  Query: {
    band: bandsServices.getBand,
    bands: bandsServices.getBands,
  },
  Mutation: {
    createBand: bandsServices.createBand,
    updateBand: bandsServices.updateBand,
    deleteBand: bandsServices.deleteBand,
  },
};

export { bandsResolvers };
