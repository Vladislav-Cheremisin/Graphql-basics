const tracksSchema = /* GraphQL */ `
  type Track {
    id: ID!
    title: String!
    album: Album
    artists: [Artist]
    bands: [Band]
    duration: Int
    released: Int
    genres: [Genre]
  }

  type Tracks {
    items: [Track]
    limit: Int
    offset: Int
    total: Int
  }

  type Query {
    track(id: ID!): Track
    tracks(limit: Int = 5, offset: Int = 0): Tracks
  }
`;

export { tracksSchema };
