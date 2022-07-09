import axios from "axios";

import jwtOps from "../usersJwtOps";
import { envError, incorrectDataError } from "../../../errors";
import { UserArgs, LoginArgs, RegisterArgs } from "../usersTypes";

class UserServices {
  public register = async (
    _parent: undefined,
    args: RegisterArgs
  ): Promise<Object> => {
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
        throw incorrectDataError;
      }
    }
  };

  public login = async (
    _parent: undefined,
    args: LoginArgs
  ): Promise<Object> => {
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
          jwtOps.setJwtToken(response.jwt);

          return {
            jwt: jwtOps.getJwtToken(),
          };
        } else {
          throw incorrectDataError;
        }
      } else {
        throw envError;
      }
    } catch (err) {
      throw err;
    }
  };

  public getUser = async (
    _parent: undefined,
    args: UserArgs
  ): Promise<Object> => {
    try {
      const url = process.env.USERS_URL + `/${args.id}`;
      const response = await (await axios.get(url)).data;

      return response;
    } catch (err) {
      throw incorrectDataError;
    }
  };
}

const userServices = new UserServices();

export default userServices;
