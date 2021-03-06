import axios from "axios";

import jwtOps from "../../users/usersJwtOps";
import bandsServices from "../../bands/services/bandsServices";
import { ArtistTsType, ArtistsTsType } from "../artistsTsTypes";

import {
  IdArgs,
  PaginationArgs,
  DeleteInfoTsType,
} from "../../../generalTsTypes";

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
        const result = { ...response };

        result.bands = await this.getAdditionalData(result);

        delete result.bandsIds;

        return this.parseResponse(result);
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
    args: PaginationArgs
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

        for (let i = 0; i < correctArtists.length; i++) {
          correctArtists[i].bands = await this.getAdditionalData(
            correctArtists[i]
          );

          delete correctArtists[i].bandsIds;
        }

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

        result.bands = await this.getAdditionalData(result);
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

        result.bands = await this.getAdditionalData(result);
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
        throw incorrectDataError;
      } else {
        throw err;
      }
    }
  };

  private getAdditionalData = async (artist: ArtistTsType): Promise<any> => {
    try {
      if (artist.bandsIds) {
        const result = [];
        const bandsIds = artist.bandsIds;

        for (let i = 0; i < bandsIds.length; i++) {
          const url = process.env.BANDS_URL + `/${bandsIds[i]}`;
          const response = await (await axios.get(url)).data;

          if (response) {
            const correctBand = await bandsServices.getBand(undefined, {
              id: bandsIds[i],
            });

            result.push(correctBand);
          }
        }

        return result;
      }
    } catch (err) {}
  };

  public parseResponse = (res: ArtistTsType): ArtistTsType => {
    const result = { ...res, id: res._id };

    delete result._id;

    return result;
  };
}

const artistsServices = new ArtistsServices();

export default artistsServices;
