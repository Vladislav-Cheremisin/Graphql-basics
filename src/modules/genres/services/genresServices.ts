import axios from "axios";

import jwtOps from "../../users/usersJwtOps";
import { GenreTsType, GenresTsType } from "../genresTsTypes";

import {
  IdArgs,
  PaginationArgs,
  DeleteInfoTsType,
} from "../../../generalTsTypes";

import {
  wrongIdError,
  incorrectDataError,
  envError,
  authorizationError,
} from "../../../errors";

class GenresServices {
  public getGenre = async (
    _parent: undefined,
    args: GenreTsType
  ): Promise<GenreTsType> => {
    try {
      const url = process.env.GENRES_URL + `/${args.id}`;
      const response = await (await axios.get(url)).data;

      if (response) {
        return this.parseResponse(response);
      } else {
        throw wrongIdError;
      }
    } catch (err) {
      if (err !== wrongIdError) {
        throw incorrectDataError;
      } else {
        throw err;
      }
    }
  };

  public getGenres = async (
    _parent: undefined,
    args: PaginationArgs
  ): Promise<GenresTsType> => {
    try {
      const url = process.env.GENRES_URL;

      if (typeof url === "string") {
        const response = await (
          await axios.get(url, {
            params: {
              limit: args.limit,
              offset: args.offset,
            },
          })
        ).data;

        const correctGenres = response.items.map((genre: GenreTsType) =>
          this.parseResponse(genre)
        );

        const result: GenresTsType = {
          items: correctGenres,
          limit: response.limit,
          offset: response.offset,
          total: response.total,
        };

        return result;
      } else {
        throw envError;
      }
    } catch (err) {
      throw err;
    }
  };

  public createGenre = async (
    _parent: undefined,
    args: GenreTsType
  ): Promise<GenreTsType> => {
    try {
      const url = process.env.GENRES_URL;

      if (typeof url === "string") {
        const token = jwtOps.getJwtToken();

        if (!token) {
          throw authorizationError;
        }

        const response = await (
          await axios.post(url, args, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        ).data;

        return this.parseResponse(response);
      } else {
        throw envError;
      }
    } catch (err) {
      if (err !== envError && err !== authorizationError) {
        throw incorrectDataError;
      } else {
        throw err;
      }
    }
  };

  public updateGenre = async (
    _parent: undefined,
    args: IdArgs
  ): Promise<GenreTsType> => {
    try {
      const url = process.env.GENRES_URL + `/${args.id}`;
      const token = jwtOps.getJwtToken();

      if (!token) {
        throw authorizationError;
      }

      const response = await (
        await axios.put(url, args, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data;

      if (response) {
        return this.parseResponse(response);
      } else {
        throw wrongIdError;
      }
    } catch (err) {
      if (err === authorizationError || err === wrongIdError) {
        throw err;
      } else {
        throw incorrectDataError;
      }
    }
  };

  public deleteGenre = async (
    _parent: undefined,
    args: IdArgs
  ): Promise<DeleteInfoTsType> => {
    try {
      const url = process.env.GENRES_URL + `/${args.id}`;
      const token = jwtOps.getJwtToken();

      if (!token) {
        throw authorizationError;
      }

      const response = await (
        await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data;

      if (response.deletedCount === 0) {
        throw wrongIdError;
      } else {
        return response;
      }
    } catch (err) {
      if (err !== authorizationError && err !== wrongIdError) {
        throw incorrectDataError;
      } else {
        throw err;
      }
    }
  };

  public parseResponse = (res: GenreTsType): GenreTsType => {
    const result = { ...res, id: res._id };

    delete result._id;

    return result;
  };
}

const genresServices = new GenresServices();

export default genresServices;
