import tracksServices from "../services/tracksServices";

const tracksResolvers = {
  Query: {
    track: tracksServices.getTrack,
    tracks: tracksServices.getTracks,
  },
  Mutation: {
    createTrack: tracksServices.createTrack,
    updateTrack: tracksServices.updateTrack,
  },
};

export { tracksResolvers };
