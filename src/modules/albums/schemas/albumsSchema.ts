const albumsSchema = /* GraphQL */ `
  type Album {
    id: ID!
    name: String
    released: Int
    artists: [Artist]
    bands: [Band]
    tracks: [Track]
    genres: [Genre]
    image: String
  }

  type Albums {
    items: [Album]
    limit: Int
    offset: Int
    total: Int
  }

  type Query {
    album(id: ID!): Album
    albums(limit: Int = 5, offset: Int = 0): Albums
  }

  type Mutation {
    createAlbum(
      name: String!
      released: Int!
      artistsIds: [String]
      bandsIds: [String]
      trackIds: [String]
      genresIds: [String]
      image: String
    ): Album

    updateAlbum(
      id: ID!
      name: String
      released: Int
      artistsIds: [String]
      bandsIds: [String]
      trackIds: [String]
      genresIds: [String]
      image: String
    ): Album

    deleteAlbum(id: ID!): DeleteInfo
  }
`;

export { albumsSchema };
