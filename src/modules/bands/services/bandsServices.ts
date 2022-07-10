import axios from "axios";

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

        result.genres = await this.getAdditionalData(response);

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

  private getAdditionalData = async (band: BandTsType): Promise<any> => {
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

  public parseResponse = (res: BandTsType): BandTsType => {
    const result = { ...res, id: res._id };

    delete result._id;

    return result;
  };
}

const bandsServices = new BandsServices();

export default bandsServices;
