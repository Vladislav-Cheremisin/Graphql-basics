const genresSchema = /* GraphQL */ `
  type Genre {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
  }

  type Genres {
    items: [Genre]
    limit: Int
    offset: Int
    total: Int
  }

  type Query {
    genre(id: ID!): Genre
    genres(limit: Int = 5, offset: Int = 0): Genres
  }

  type Mutation {
    createGenre(
      name: String!
      year: Int!
      description: String
      country: String
    ): Genre
  }
`;

export { genresSchema };
