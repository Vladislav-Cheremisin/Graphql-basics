const favouritesSchema = /* GraphQL */ `
  type Favourites {
    id: ID!
    userId: ID
    bands: [Band]
    genres: [Genre]
    artists: [Artist]
    tracks: [Track]
  }

  type Query {
    favourites(id: String = null): Favourites
  }

  type Mutation {
    addTrackToFavourites(id: String!): Favourites
    addBandToFavourites(id: String!): Favourites
    addArtistToFavourites(id: String!): Favourites
    addGenreToFavourites(id: String!): Favourites
  }
`;

export { favouritesSchema };
