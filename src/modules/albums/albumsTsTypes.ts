import { ArtistTsType } from "../artists/artistsTsTypes";
import { BandTsType } from "../bands/bandsTsTypes";
import { GenreTsType } from "../genres/genresTsTypes";
import { TrackTsType } from "../tracks/tracksTsTypes";

type AlbumTsType = {
  id?: String;
  name?: String;
  released?: number;
  artists?: [ArtistTsType];
  bands?: [BandTsType];
  tracks?: [TrackTsType];
  genres?: [GenreTsType];
  image?: String;
};

export { AlbumTsType };
