const favouritesSchema = /* GraphQL */ `
  type Favourites {
    id: ID!
    userId: ID
    bands: [Band]
    genres: [Genre]
    artists: [Artist]
    tracks: [Track]
  }
`;

export { favouritesSchema };
