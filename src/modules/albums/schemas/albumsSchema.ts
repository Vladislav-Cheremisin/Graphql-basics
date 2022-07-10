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
`;

export { albumsSchema };
