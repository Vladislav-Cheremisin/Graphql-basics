type UserArgs = {
  id: String;
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

export { UserArgs, LoginArgs, RegisterArgs };
