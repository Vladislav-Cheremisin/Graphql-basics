import axios from "axios";

import jwtOps from "../../users/usersJwtOps";
import { authorizationError, incorrectDataError } from "../../../errors";
import { FavouritesArgs, FavouritesTsType } from "../favouritesTsTypes";
import genresServices from "../../genres/services/genresServices";
import artistsServices from "../../artists/services/artistsServices";
import bandsServices from "../../bands/services/bandsServices";
import tracksServices from "../../tracks/services/tracksServices";

class FavouritesServices {
  getFavourites = async (): Promise<any> => {
    try {
      const url = process.env.FAVOURITES_URL;

      if (typeof url === "string") {
        const token = jwtOps.getJwtToken();

        if (!token) {
          throw authorizationError;
        }

        const response = await (
          await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        ).data;

        const correctFavourites = { ...response };

        correctFavourites.genres = await this.getAdditionalGenresData(
          correctFavourites
        );
        correctFavourites.bands = await this.getAdditionalBandsData(
          correctFavourites
        );
        correctFavourites.artists = await this.getAdditionalArtistData(
          correctFavourites
        );
        correctFavourites.tracks = await this.getAdditionalTracksData(
          correctFavourites
        );

        delete correctFavourites.genresIds;
        delete correctFavourites.bandsIds;
        delete correctFavourites.artistsIds;
        delete correctFavourites.tracksIds;

        return this.parseResponse(correctFavourites);
      }
    } catch (err) {
      throw err;
    }
  };

  addTrackToFavourites = async (_parent: undefined, args: FavouritesArgs) => {
    try {
      const token = jwtOps.getJwtToken();

      if (!token) {
        throw authorizationError;
      }

      const url = process.env.TRACKS_URL;
      const response = await (await axios.get(url + `/${args.id}`)).data;

      if (response) {
        const addUrl = process.env.FAVOURITES_URL + `/add`;
        const response = await (
          await axios.put(
            addUrl,
            {
              type: "tracks",
              id: args.id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        ).data;

        const correctFavourites = { ...response };

        correctFavourites.genres = await this.getAdditionalGenresData(
          correctFavourites
        );
        correctFavourites.bands = await this.getAdditionalBandsData(
          correctFavourites
        );
        correctFavourites.artists = await this.getAdditionalArtistData(
          correctFavourites
        );
        correctFavourites.tracks = await this.getAdditionalTracksData(
          correctFavourites
        );

        delete correctFavourites.genresIds;
        delete correctFavourites.bandsIds;
        delete correctFavourites.artistsIds;
        delete correctFavourites.tracksIds;

        return this.parseResponse(correctFavourites);
      } else {
        throw incorrectDataError;
      }
    } catch (err) {
      if (err === authorizationError || err === incorrectDataError) {
        throw err;
      } else {
        throw incorrectDataError;
      }
    }
  };

  addBandToFavourites = async (_parent: undefined, args: FavouritesArgs) => {
    try {
      const token = jwtOps.getJwtToken();

      if (!token) {
        throw authorizationError;
      }

      const url = process.env.BANDS_URL;
      const response = await (await axios.get(url + `/${args.id}`)).data;

      if (response) {
        const addUrl = process.env.FAVOURITES_URL + `/add`;
        const response = await (
          await axios.put(
            addUrl,
            {
              type: "bands",
              id: args.id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        ).data;

        const correctFavourites = { ...response };

        correctFavourites.genres = await this.getAdditionalGenresData(
          correctFavourites
        );
        correctFavourites.bands = await this.getAdditionalBandsData(
          correctFavourites
        );
        correctFavourites.artists = await this.getAdditionalArtistData(
          correctFavourites
        );
        correctFavourites.tracks = await this.getAdditionalTracksData(
          correctFavourites
        );

        delete correctFavourites.genresIds;
        delete correctFavourites.bandsIds;
        delete correctFavourites.artistsIds;
        delete correctFavourites.tracksIds;

        return this.parseResponse(correctFavourites);
      } else {
        throw incorrectDataError;
      }
    } catch (err) {
      if (err === authorizationError || err === incorrectDataError) {
        throw err;
      } else {
        throw incorrectDataError;
      }
    }
  };

  addArtistToFavourites = async (_parent: undefined, args: FavouritesArgs) => {
    try {
      const token = jwtOps.getJwtToken();

      if (!token) {
        throw authorizationError;
      }

      const url = process.env.ARTISTS_URL;
      const response = await (await axios.get(url + `/${args.id}`)).data;

      if (response) {
        const addUrl = process.env.FAVOURITES_URL + `/add`;
        const response = await (
          await axios.put(
            addUrl,
            {
              type: "artists",
              id: args.id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        ).data;

        const correctFavourites = { ...response };

        correctFavourites.genres = await this.getAdditionalGenresData(
          correctFavourites
        );
        correctFavourites.bands = await this.getAdditionalBandsData(
          correctFavourites
        );
        correctFavourites.artists = await this.getAdditionalArtistData(
          correctFavourites
        );
        correctFavourites.tracks = await this.getAdditionalTracksData(
          correctFavourites
        );

        delete correctFavourites.genresIds;
        delete correctFavourites.bandsIds;
        delete correctFavourites.artistsIds;
        delete correctFavourites.tracksIds;

        return this.parseResponse(correctFavourites);
      } else {
        throw incorrectDataError;
      }
    } catch (err) {
      if (err === authorizationError || err === incorrectDataError) {
        throw err;
      } else {
        throw incorrectDataError;
      }
    }
  };

  addGenreToFavourites = async (_parent: undefined, args: FavouritesArgs) => {
    try {
      const token = jwtOps.getJwtToken();

      if (!token) {
        throw authorizationError;
      }

      const url = process.env.GENRES_URL;
      const response = await (await axios.get(url + `/${args.id}`)).data;

      if (response) {
        const addUrl = process.env.FAVOURITES_URL + `/add`;
        const response = await (
          await axios.put(
            addUrl,
            {
              type: "genres",
              id: args.id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        ).data;

        const correctFavourites = { ...response };

        correctFavourites.genres = await this.getAdditionalGenresData(
          correctFavourites
        );
        correctFavourites.bands = await this.getAdditionalBandsData(
          correctFavourites
        );
        correctFavourites.artists = await this.getAdditionalArtistData(
          correctFavourites
        );
        correctFavourites.tracks = await this.getAdditionalTracksData(
          correctFavourites
        );

        delete correctFavourites.genresIds;
        delete correctFavourites.bandsIds;
        delete correctFavourites.artistsIds;
        delete correctFavourites.tracksIds;

        return this.parseResponse(correctFavourites);
      } else {
        throw incorrectDataError;
      }
    } catch (err) {
      if (err === authorizationError || err === incorrectDataError) {
        throw err;
      } else {
        throw incorrectDataError;
      }
    }
  };

  private getAdditionalTracksData = async (
    favourites: FavouritesTsType
  ): Promise<any> => {
    try {
      if (favourites.tracksIds) {
        const result = [];
        const tracksIds = favourites.tracksIds;

        for (let i = 0; i < tracksIds.length; i++) {
          const url = process.env.TRACKS_URL + `/${tracksIds[i]}`;
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

  private getAdditionalBandsData = async (
    favourites: FavouritesTsType
  ): Promise<any> => {
    try {
      if (favourites.bandsIds) {
        const result = [];
        const bandsIds = favourites.bandsIds;

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
    favourties: FavouritesTsType
  ): Promise<any> => {
    try {
      if (favourties.artistsIds) {
        const result = [];
        const artistsIds = favourties.artistsIds;

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
    favourties: FavouritesTsType
  ): Promise<any> => {
    try {
      if (favourties.genresIds) {
        const result = [];
        const genresIds = favourties.genresIds;

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

  public parseResponse = (res: FavouritesTsType): FavouritesTsType => {
    const result = { ...res, id: res._id };

    delete result._id;

    return result;
  };
}

const favouritesServices = new FavouritesServices();

export default favouritesServices;
