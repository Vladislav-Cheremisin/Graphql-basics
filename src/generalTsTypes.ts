type IdArgs = {
  id: String;
};

type PaginationArgs = {
  limit: number;
  offset: number;
};

type DeleteInfoTsType = {
  acknowledged: Boolean;
  deletedCount: number;
};

export { IdArgs, PaginationArgs, DeleteInfoTsType };
