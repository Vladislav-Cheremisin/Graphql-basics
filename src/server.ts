import { ApolloServer, gql } from "apollo-server";

import axios from "axios";

/* Move in separate files */

const envError = new Error(
  "Incorrect url to user microservice, please check .env file"
);
let jwt = null;

type UserArgs = {
  id: String;
};

type LoginArgs = {
  email: String;
  password: String;
};

type RegisterArgs = {
  firstName: String;
  lastName: String;
  password: String;
  email: String;
};

/* ---------   */

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String
    lastName: String
    password: String
    email: String!
  }

  type Jwt {
    jwt: String!
  }

  type Query {
    user(id: ID!): User
    jwt(email: String!, password: String!): Jwt
  }

  type Mutation {
    register(
      firstName: String
      lastName: String
      password: String
      email: String
    ): User
  }
`;

const resolvers = {
  Query: {
    user: async (_parent: undefined, args: UserArgs) => {
      try {
        const url = process.env.USERS_URL + `/${args.id}`;
        const response = await (await axios.get(url)).data;

        return response;
      } catch (err) {
        throw new Error(
          "Entered ID was incorrect, please try again with using correct ID!"
        );
      }
    },

    jwt: async (_parent: undefined, args: LoginArgs) => {
      try {
        const url = process.env.USERS_URL + `/login`;

        if (url) {
          const response = await (
            await axios.post(url, {
              email: args.email,
              password: args.password,
            })
          ).data;

          if (response) {
            jwt = response.jwt;

            return response;
          } else {
            throw new Error(
              "Entered data was incorrect, please try again with using correct email and password!"
            );
          }
        } else {
          throw envError;
        }
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    register: async (_parent: undefined, args: RegisterArgs) => {
      try {
        const url = process.env.USERS_URL + `/register`;

        if (url) {
          const response = await (
            await axios.post(url, {
              firstName: args.firstName,
              lastName: args.lastName,
              password: args.password,
              email: args.email,
            })
          ).data;

          return response;
        } else {
          throw envError;
        }
      } catch (err) {
        if (err === envError) {
          throw err;
        } else {
          throw new Error(
            "Entered data was incorrect, please try again with using correct request data"
          );
        }
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
});

const startApolloServer = (): void => {
  server.listen(process.env.APOLLO_SERVER_PORT).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

export default startApolloServer;
