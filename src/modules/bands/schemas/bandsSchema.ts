const bandsSchema = /* GraphQL */ `
  type Member {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    instruments: [String]
  }

  type Band {
    id: ID!
    name: String
    origin: String
    members: [Member]
    website: String
    genres: [Genre]
  }

  type Bands {
    items: [Band]
    limit: Int
    offset: Int
    total: Int
  }

  type Query {
    band(id: ID!): Band
    bands(limit: Int = 5, offset: Int = 0): Bands
  }

  type Mutation {
    createBand(
      name: String!
      origin: String
      membersIds: [String]
      website: String
      genresIds: [String]
    ): Band

    updateBand(
      id: ID!
      name: String
      origin: String
      membersIds: [String]
      website: String
      genresIds: [String]
    ): Band

    deleteBand(id: ID!): DeleteInfo
  }
`;

export { bandsSchema };
