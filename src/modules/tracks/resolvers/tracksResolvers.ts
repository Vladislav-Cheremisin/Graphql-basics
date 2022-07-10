import tracksServices from "../services/tracksServices";

const tracksResolvers = {
  Query: {
    track: tracksServices.getTrack,
  },
  Mutation: {},
};

export { tracksResolvers };
