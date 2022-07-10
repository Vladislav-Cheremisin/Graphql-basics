import { ArtistTsType } from "../artists/artistsTsTypes";
import { BandTsType } from "../bands/bandsTsTypes";
import { GenreTsType } from "../genres/genresTsTypes";
import { TrackTsType } from "../tracks/tracksTsTypes";

type AlbumTsType = {
  id?: String;
  _id?: String;
  name?: String;
  released?: number;
  artists?: [ArtistTsType];
  artistsIds?: [String];
  bands?: [BandTsType];
  bandsIds?: [String];
  tracks?: [TrackTsType];
  trackIds?: [String];
  genres?: [GenreTsType];
  genresIds?: [String];
  image?: String;
};

type AlbumsTsType = {
  items: [AlbumTsType];
  limit: number;
  offset: number;
  total: number;
};

export { AlbumTsType, AlbumsTsType };
