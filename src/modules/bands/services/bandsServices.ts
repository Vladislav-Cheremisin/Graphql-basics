import axios from "axios";

import jwtOps from "../../users/usersJwtOps";
import { BandTsType, BandsTsType, MemberTsType } from "../bandsTsTypes";
import genresServices from "../../genres/services/genresServices";

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
import { GenreTsType } from "../../genres/genresTsTypes";
import artistsServices from "../../artists/services/artistsServices";

class BandsServices {
  public getBand = async (
    _parent: undefined,
    args: IdArgs
  ): Promise<BandTsType> => {
    try {
      const url = process.env.BANDS_URL + `/${args.id}`;
      const response = await (await axios.get(url)).data;

      if (response) {
        const result = { ...response };

        result.genres = await this.getAdditionalGenresData(response);

        delete result.genresIds;

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

  public getBands = async (
    _parent: undefined,
    args: PaginationArgs
  ): Promise<BandsTsType> => {
    try {
      const url = process.env.BANDS_URL;

      if (typeof url === "string") {
        const response = await (
          await axios.get(url, {
            params: {
              limit: args.limit,
              offset: args.offset,
            },
          })
        ).data;

        const correctArtists = response.items.map((band: BandTsType) =>
          this.parseResponse(band)
        );

        for (let i = 0; i < correctArtists.length; i++) {
          correctArtists[i].genres = await this.getAdditionalGenresData(
            correctArtists[i]
          );

          delete correctArtists[i].genresIds;
        }

        const result: BandsTsType = {
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

  public createBand = async (
    _parent: undefined,
    args: BandTsType
  ): Promise<BandTsType> => {
    try {
      const url = process.env.BANDS_URL;

      if (typeof url === "string") {
        const token = jwtOps.getJwtToken();

        if (!token) {
          throw authorizationError;
        }

        const correctArgs = { ...args };

        correctArgs.members = await this.getAdditionalMembersData(correctArgs);

        delete correctArgs.membersIds;

        const response = await (
          await axios.post(url, correctArgs, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        ).data;

        const result = { ...response };

        result.genres = await this.getAdditionalGenresData(result);
        delete result.genresIds;

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

  public updateBand = async (
    _parent: undefined,
    args: BandTsType
  ): Promise<BandTsType> => {
    try {
      const url = process.env.BANDS_URL + `/${args.id}`;

      const token = jwtOps.getJwtToken();

      if (!token) {
        throw authorizationError;
      }

      const correctArgs = { ...args };

      correctArgs.members = await this.getAdditionalMembersData(correctArgs);

      delete correctArgs.membersIds;

      const response = await (
        await axios.put(url, correctArgs, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data;

      if (response) {
        const result = { ...response };

        result.genres = await this.getAdditionalGenresData(result);
        delete result.genresIds;

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

  private getAdditionalGenresData = async (band: BandTsType): Promise<any> => {
    try {
      if (band.genresIds) {
        const result = [];
        const genresIds = band.genresIds;

        for (let i = 0; i < genresIds.length; i++) {
          const url = process.env.GENRES_URL + `/${genresIds[i]}`;
          const response = await (await axios.get(url)).data;

          if (response) {
            result.push(genresServices.parseResponse(response));
          }
        }

        return result;
      }
    } catch (err) {}
  };

  private getAdditionalMembersData = async (band: BandTsType): Promise<any> => {
    try {
      if (band.membersIds) {
        const result = [];
        const membersIds = band.membersIds;

        for (let i = 0; i < membersIds.length; i++) {
          const url = process.env.ARTISTS_URL + `/${membersIds[i]}`;
          const response = await (await axios.get(url)).data;

          if (response) {
            const correctArtistData = await artistsServices.getArtist(
              undefined,
              {
                id: membersIds[i],
              }
            );

            const correctMember = {
              id: correctArtistData.id,
              firstName: correctArtistData.firstName,
              secondName: correctArtistData.secondName,
              middleName: correctArtistData.middleName,
              instruments: correctArtistData.instruments,
            };

            result.push(correctMember);
          }
        }

        return result;
      }
    } catch (err) {}
  };

  public parseResponse = (res: BandTsType): BandTsType => {
    const result = { ...res, id: res._id };

    delete result._id;

    return result;
  };
}

const bandsServices = new BandsServices();

export default bandsServices;
