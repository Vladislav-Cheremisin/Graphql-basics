type ArtistTsType = {
  id?: String;
  _id?: String;
  firstName: String;
  secondName: String;
  middleName: String;
  birthDate: String;
  birthPlace: String;
  country: String;
  bands: [Object];
  instruments: [String];
};

type ArtistsTsType = {
  items: [ArtistTsType];
  limit: number;
  offset: number;
  total: number;
};

export { ArtistTsType, ArtistsTsType };
