import axios from "axios";

import jwtOps from "../usersJwtOps";
import { envError, incorrectDataError } from "../../../errors";
import {
  UserTsType,
  UserArgs,
  LoginArgs,
  RegisterArgs,
  jwtObj,
} from "../usersTypes";

class UserServices {
  public register = async (
    _parent: undefined,
    args: RegisterArgs
  ): Promise<UserTsType> => {
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

        return this.parseResponse(response);
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
  ): Promise<jwtObj> => {
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
      if (err === envError) {
        throw err;
      } else {
        throw incorrectDataError;
      }
    }
  };

  public getUser = async (
    _parent: undefined,
    args: UserArgs
  ): Promise<UserTsType> => {
    try {
      const url = process.env.USERS_URL + `/${args.id}`;
      const response = await (await axios.get(url)).data;

      return this.parseResponse(response);
    } catch (err) {
      throw incorrectDataError;
    }
  };

  private parseResponse = (res: UserTsType): UserTsType => {
    const result = { ...res, id: res._id };

    delete result._id;

    return result;
  };
}

const userServices = new UserServices();

export default userServices;
