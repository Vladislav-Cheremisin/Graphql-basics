import axios from "axios";

import { IdArgs } from "../../../generalTsTypes";
import { incorrectDataError, envError } from "../../../errors";
import { ArtistTsType, ArtistsTsType } from "../artistsTsTypes";

class ArtistsServices {
  public getArtist = async (
    _parent: undefined,
    args: IdArgs
  ): Promise<ArtistTsType> => {
    try {
      const url = process.env.ARTISTS_URL + `/${args.id}`;
      const response = await (await axios.get(url)).data;

      return this.parseResponse(response);
    } catch (err) {
      throw incorrectDataError;
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

  private parseResponse = (res: ArtistTsType): ArtistTsType => {
    const result = { ...res, id: res._id };

    delete result._id;

    return result;
  };
}

const artistsServices = new ArtistsServices();

export default artistsServices;
