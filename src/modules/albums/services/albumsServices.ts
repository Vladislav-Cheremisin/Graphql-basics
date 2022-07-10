import axios from "axios";

import artistsServices from "../../artists/services/artistsServices";
import bandsServices from "../../bands/services/bandsServices";
import genresServices from "../../genres/services/genresServices";
import tracksServices from "../../tracks/services/tracksServices";
import { AlbumsTsType, AlbumTsType } from "../albumsTsTypes";

import {
  wrongIdError,
  authorizationError,
  envError,
  incorrectDataError,
} from "../../../errors";
import { IdArgs, PaginationArgs } from "../../../generalTsTypes";

class AlbumsServices {
  public getAlbum = async (
    _parent: undefined,
    args: IdArgs
  ): Promise<AlbumTsType> => {
    try {
      const url = process.env.ALBUMS_URL + `/${args.id}`;
      const response = await (await axios.get(url)).data;

      if (response) {
        const result = { ...response };

        result.genres = await this.getAdditionalGenresData(response);
        result.bands = await this.getAdditionalBandsData(response);
        result.artists = await this.getAdditionalArtistData(response);
        result.tracks = await this.getAdditionalTracksData(response);

        delete result.genresIds;
        delete result.bandsIds;
        delete result.artistsIds;
        delete result.tracksIds;

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

  public getAlbums = async (
    _parent: undefined,
    args: PaginationArgs
  ): Promise<AlbumsTsType> => {
    try {
      const url = process.env.ALBUMS_URL;

      if (typeof url === "string") {
        const response = await (
          await axios.get(url, {
            params: {
              limit: args.limit,
              offset: args.offset,
            },
          })
        ).data;

        const correctAlbums = response.items.map((track: AlbumTsType) =>
          this.parseResponse(track)
        );

        for (let i = 0; i < correctAlbums.length; i++) {
          correctAlbums[i].genres = await this.getAdditionalGenresData(
            correctAlbums[i]
          );
          correctAlbums[i].bands = await this.getAdditionalBandsData(
            correctAlbums[i]
          );
          correctAlbums[i].artists = await this.getAdditionalArtistData(
            correctAlbums[i]
          );
          correctAlbums[i].tracks = await this.getAdditionalTracksData(
            correctAlbums[i]
          );

          delete correctAlbums[i].genresIds;
          delete correctAlbums[i].bandsIds;
          delete correctAlbums[i].artistsIds;
          delete correctAlbums[i].tracksIds;
        }

        const result: AlbumsTsType = {
          items: correctAlbums,
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

  private getAdditionalTracksData = async (
    album: AlbumTsType
  ): Promise<any> => {
    try {
      if (album.tracksIds) {
        const result = [];
        const tracksIds = album.tracksIds;

        for (let i = 0; i < tracksIds.length; i++) {
          const url = process.env.BANDS_URL + `/${tracksIds[i]}`;
          const response = await (await axios.get(url)).data;

          if (response) {
            const correctBand = await tracksServices.getTrack(undefined, {
              id: tracksIds[i],
            });

            result.push(correctBand);
          }
        }

        return result;
      }
    } catch (err) {}
  };

  private getAdditionalBandsData = async (album: AlbumTsType): Promise<any> => {
    try {
      if (album.bandsIds) {
        const result = [];
        const bandsIds = album.bandsIds;

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
    album: AlbumTsType
  ): Promise<any> => {
    try {
      if (album.artistsIds) {
        const result = [];
        const artistsIds = album.artistsIds;

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
    album: AlbumTsType
  ): Promise<any> => {
    try {
      if (album.genresIds) {
        const result = [];
        const genresIds = album.genresIds;

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

  public parseResponse = (res: AlbumTsType): AlbumTsType => {
    const result = { ...res, id: res._id };

    delete result._id;

    return result;
  };
}

const albumsServices = new AlbumsServices();

export default albumsServices;
