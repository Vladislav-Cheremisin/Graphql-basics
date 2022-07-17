import { AlbumTsType } from "../albums/albumsTsTypes";

type TrackTsType = {
  id?: String;
  _id?: String;
  title?: String;
  album?: AlbumTsType;
  albumId?: String;
  artists?: [Object];
  artistsIds: [String];
  bands: [Object];
  bandsIds: [String];
  duration: number;
  released: number;
  genres: [Object];
  genresIds: [String];
};

type TracksTsType = {
  items: [TrackTsType];
  limit: number;
  offset: number;
  total: number;
};

export { TrackTsType, TracksTsType };
