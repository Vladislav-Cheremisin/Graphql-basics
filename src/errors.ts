const envError = new Error(
  "Incorrect url to user microservice, please check .env file"
);

const incorrectDataError = new Error(
  "Entered data was incorrect, please try again with using correct request data"
);

const authorizationError = new Error(
  "This operation available only for authorized users! Please login and try again"
);

export { envError, incorrectDataError, authorizationError };
