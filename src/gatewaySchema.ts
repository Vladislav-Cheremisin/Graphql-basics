import usersData from "./modules/users/users";
import artistsData from "./modules/artists/artists";
import bandsData from "./modules/bands/bands";
import genresData from "./modules/genres/genres";
import favouritesData from "./modules/favourites/favourites";
import albumsData from "./modules/albums/albums";
import tracksData from "./modules/tracks/tracks";

const typeDefs = [
  usersData.typeDefs,
  artistsData.typeDefs,
  bandsData.typeDefs,
  genresData.typeDefs,
  favouritesData.typeDefs,
  albumsData.typeDefs,
  tracksData.typeDefs,
];

const resolvers = [
  usersData.resolvers,
  artistsData.resolvers,
  bandsData.resolvers,
  genresData.resolvers,
  favouritesData.resolvers,
  albumsData.resolvers,
  tracksData.resolvers,
];

export { typeDefs, resolvers };
