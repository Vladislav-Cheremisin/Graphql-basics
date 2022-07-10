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
`;

export { genresSchema };
