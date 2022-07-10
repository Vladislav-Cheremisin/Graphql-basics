import { BandTsType } from "../bands/bandsTsTypes";
import { GenreTsType } from "../genres/genresTsTypes";
import { ArtistTsType } from "../artists/artistsTsTypes";
import { TrackTsType } from "../tracks/tracksTsTypes";

type FavouritesTsType = {
  id?: String;
  _id?: String;
  userId?: String;
  bands?: [BandTsType];
  bandsIds?: [String];
  genres?: [GenreTsType];
  genresIds?: [String];
  artists?: [ArtistTsType];
  artistsIds?: [String];
  tracks?: [TrackTsType];
  tracksIds?: [String];
};

type FavouritesArgs = {
  type: String;
  id: String;
};

export { FavouritesTsType, FavouritesArgs };
