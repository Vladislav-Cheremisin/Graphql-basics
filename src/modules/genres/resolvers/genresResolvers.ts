import genresServices from "../services/genresServices";

const genresResolvers = {
  Query: {
    genre: genresServices.getGenre,
    genres: genresServices.getGenres,
  },
  Mutation: {
    createGenre: genresServices.createGenre,
    updateGenre: genresServices.updateGenre,
  },
};

export { genresResolvers };
