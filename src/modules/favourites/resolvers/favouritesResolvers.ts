import favouritesServices from "../services/favouritesServices";

const favouritesResolvers = {
  Query: {
    favourites: favouritesServices.getFavourites,
  },
  Mutation: {
    addTrackToFavourites: favouritesServices.addTrackToFavourites,
    addBandToFavourites: favouritesServices.addBandToFavourites,
    addArtistToFavourites: favouritesServices.addArtistToFavourites,
    addGenreToFavourites: favouritesServices.addGenreToFavourites,
  },
};

export { favouritesResolvers };
