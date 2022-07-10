import albumsServices from "../services/albumsServices";

const albumsResolvers = {
  Query: {
    album: albumsServices.getAlbum,
    albums: albumsServices.getAlbums,
  },
  Mutation: {},
};

export { albumsResolvers };
