const artistsSchema = /* GraphQL */ `
  type Artist {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bands: [Band]
    instruments: [String]
  }

  type Artists {
    items: [Artist]
    limit: Int
    offset: Int
    total: Int
  }

  type Query {
    artist(id: ID!): Artist
    artists(limit: Int = 5, offset: Int = 0): Artists
  }
`;

export { artistsSchema };
