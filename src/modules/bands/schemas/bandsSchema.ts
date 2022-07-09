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
`;

export { bandsSchema };
