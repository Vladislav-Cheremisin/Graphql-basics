type GenreTsType = {
  id?: String;
  _id?: String;
  name?: String;
  description?: String;
  country?: String;
  year?: Number;
};

type GenresTsType = {
  items: [GenreTsType];
  limit: number;
  offset: number;
  total: number;
};

export { GenreTsType, GenresTsType };
