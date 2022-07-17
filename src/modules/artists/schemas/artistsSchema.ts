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

  type DeleteInfo {
    acknowledged: Boolean
    deletedCount: Int
  }

  type Query {
    artist(id: ID!): Artist
    artists(limit: Int = 5, offset: Int = 0): Artists
  }

  type Mutation {
    createArtist(
      firstName: String!
      secondName: String!
      country: String!
      middleName: String
      birthDate: String
      birthPlace: String
      bandsIds: [String]
      instruments: [String]
    ): Artist

    updateArtist(
      id: ID!
      firstName: String
      secondName: String
      country: String
      middleName: String
      birthDate: String
      birthPlace: String
      bandsIds: [String]
      instruments: [String]
    ): Artist

    deleteArtist(id: ID!): DeleteInfo
  }
`;

export { artistsSchema };
