import artistsServices from "../services/artistsServices";

const artistsResolvers = {
  Query: {
    artist: artistsServices.getArtist,
    artists: artistsServices.getArtists,
  },
  Mutation: {},
};

export { artistsResolvers };
