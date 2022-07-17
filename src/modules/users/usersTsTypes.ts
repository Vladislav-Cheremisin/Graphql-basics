type UserTsType = {
  _id?: String;
  id?: String;
  firstName: String;
  lastName: String;
  password: String;
  email: String;
};

type LoginArgs = {
  email: String;
  password: String;
};

type RegisterArgs = {
  firstName: String;
  lastName: String;
  password: String;
  email: String;
};

type jwtObj = {
  jwt: String | null;
};

export { UserTsType, LoginArgs, RegisterArgs, jwtObj };
