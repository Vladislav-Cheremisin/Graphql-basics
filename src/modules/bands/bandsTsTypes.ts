import { GenreTsType } from "../genres/genresTsTypes";

type MemberTsType = {
  id: String;
  firstName: String;
  secondName: String;
  middleName: String;
  instruments: [String];
};

type BandTsType = {
  id?: String;
  _id?: String;
  name?: String;
  origin?: String;
  members?: [MemberTsType];
  website?: String;
  genres?: [GenreTsType];
};

type BandsTsType = {
  items: [BandTsType];
  limit: number;
  offset: number;
  total: number;
};

export { MemberTsType, BandTsType, BandsTsType };
