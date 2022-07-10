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

        result.genres = [];

        if (result.genresIds.length > 0) {
          result.genresIds.forEach(async (id: String) => {
            try {
              const genre = genresServices.getGenre(undefined, { id: id });

              result.genres.push(genre);
            } catch (err) {}
          });
        }

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

  private parseResponse = (res: BandTsType): BandTsType => {
    const result = { ...res, id: res._id };

    delete result._id;

    return result;
  };
}

const bandsServices = new BandsServices();

export default bandsServices;
