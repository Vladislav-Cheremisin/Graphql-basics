import userServices from "../services/userServices";

const usersResolvers = {
  Query: {
    user: userServices.getUser,
    jwt: userServices.login,
  },
  Mutation: {
    register: userServices.register,
  },
};

export { usersResolvers };
