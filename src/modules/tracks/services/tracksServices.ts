import axios from "axios";

import { IdArgs } from "../../../generalTsTypes";
import { PaginationArgs } from "../../../generalTsTypes";
import { TrackTsType, TracksTsType } from "../tracksTsTypes";
import genresServices from "../../genres/services/genresServices";
import bandsServices from "../../bands/services/bandsServices";
import artistsServices from "../../artists/services/artistsServices";

import {
  wrongIdError,
  authorizationError,
  envError,
  incorrectDataError,
} from "../../../errors";
class TracksServices {
  public getTrack = async (
    _parent: undefined,
    args: IdArgs
  ): Promise<TrackTsType> => {
    try {
      const url = process.env.TRACKS_URL + `/${args.id}`;
      const response = await (await axios.get(url)).data;

      if (response) {
        const result = { ...response };

        result.genres = await this.getAdditionalGenresData(response);
        result.bands = await this.getAdditionalBandsData(response);
        result.artists = await this.getAdditionalArtistData(response);

        delete result.genresIds;
        delete result.bandsIds;
        delete result.artistsIds;

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

  public getTracks = async (
    _parent: undefined,
    args: PaginationArgs
  ): Promise<TracksTsType> => {
    try {
      const url = process.env.TRACKS_URL;

      if (typeof url === "string") {
        const response = await (
          await axios.get(url, {
            params: {
              limit: args.limit,
              offset: args.offset,
            },
          })
        ).data;

        const correctTracks = response.items.map((track: TrackTsType) =>
          this.parseResponse(track)
        );

        for (let i = 0; i < correctTracks.length; i++) {
          correctTracks[i].genres = await this.getAdditionalGenresData(
            correctTracks[i]
          );
          correctTracks[i].bands = await this.getAdditionalBandsData(
            correctTracks[i]
          );
          correctTracks[i].artists = await this.getAdditionalArtistData(
            correctTracks[i]
          );

          delete correctTracks[i].genresIds;
          delete correctTracks[i].bandsIds;
          delete correctTracks[i].artistsIds;
        }

        const result: TracksTsType = {
          items: correctTracks,
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

  private getAdditionalBandsData = async (track: TrackTsType): Promise<any> => {
    try {
      if (track.bandsIds) {
        const result = [];
        const bandsIds = track.bandsIds;

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

  private getAdditionalArtistData = async (
    track: TrackTsType
  ): Promise<any> => {
    try {
      if (track.artistsIds) {
        const result = [];
        const artistsIds = track.artistsIds;

        for (let i = 0; i < artistsIds.length; i++) {
          const url = process.env.ARTISTS_URL + `/${artistsIds[i]}`;
          const response = await (await axios.get(url)).data;

          if (response) {
            const correctArtist = await artistsServices.getArtist(undefined, {
              id: artistsIds[i],
            });

            result.push(correctArtist);
          }
        }

        return result;
      }
    } catch (err) {}
  };

  private getAdditionalGenresData = async (
    track: TrackTsType
  ): Promise<any> => {
    try {
      if (track.genresIds) {
        const result = [];
        const genresIds = track.genresIds;

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

  public parseResponse = (res: TrackTsType): TrackTsType => {
    const result = { ...res, id: res._id };

    delete result._id;

    return result;
  };
}

const tracksServices = new TracksServices();

export default tracksServices;
