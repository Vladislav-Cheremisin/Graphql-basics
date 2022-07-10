import albumsServices from "../services/albumsServices";

const albumsResolvers = {
  Query: {
    album: albumsServices.getAlbum,
    albums: albumsServices.getAlbums,
  },
  Mutation: {
    createAlbum: albumsServices.createAlbum,
    updateAlbum: albumsServices.updateAlbum,
    deleteAlbum: albumsServices.deleteAlbum,
  },
};

export { albumsResolvers };
