import axios from "axios";

import jwtOps from "../../users/usersJwtOps";
import { IdArgs, DeleteInfoTsType } from "../../../generalTsTypes";
import { ArtistTsType, ArtistsTsType } from "../artistsTsTypes";
import {
  incorrectDataError,
  envError,
  authorizationError,
  wrongIdError,
} from "../../../errors";

class ArtistsServices {
  public getArtist = async (
    _parent: undefined,
    args: IdArgs
  ): Promise<ArtistTsType> => {
    try {
      const url = process.env.ARTISTS_URL + `/${args.id}`;
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

  public getArtists = async (
    _parent: undefined,
    args: any
  ): Promise<ArtistsTsType> => {
    try {
      const url = process.env.ARTISTS_URL;

      if (typeof url === "string") {
        const response = await (
          await axios.get(url, {
            params: {
              limit: args.limit,
              offset: args.offset,
            },
          })
        ).data;

        const correctArtists = response.items.map((artist: ArtistTsType) =>
          this.parseResponse(artist)
        );

        const result: ArtistsTsType = {
          items: correctArtists,
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

  public createArtist = async (
    _parent: undefined,
    args: ArtistTsType
  ): Promise<ArtistTsType> => {
    try {
      const url = process.env.ARTISTS_URL;

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

        const result = { ...response };

        result.bands = result.bandsIds; // Here must be bands logic
        delete result.bandsIds;

        return this.parseResponse(result);
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

  public updateArtist = async (
    _parent: undefined,
    args: IdArgs
  ): Promise<ArtistTsType> => {
    try {
      const url = process.env.ARTISTS_URL + `/${args.id}`;
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
        const result = { ...response };

        result.bands = result.bandsIds; // Here must be bands logic
        delete result.bandsIds;

        return this.parseResponse(result);
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

  public deleteArtist = async (
    _parent: undefined,
    args: IdArgs
  ): Promise<DeleteInfoTsType> => {
    try {
      const url = process.env.ARTISTS_URL + `/${args.id}`;
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
        throw envError;
      } else {
        throw err;
      }
    }
  };

  private parseResponse = (res: ArtistTsType): ArtistTsType => {
    const result = { ...res, id: res._id };

    delete result._id;

    return result;
  };
}

const artistsServices = new ArtistsServices();

export default artistsServices;
