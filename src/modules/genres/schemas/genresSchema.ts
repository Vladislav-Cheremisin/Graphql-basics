const genresSchema = /* GraphQL */ `
  type Genre {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
  }
`;

export { genresSchema };
