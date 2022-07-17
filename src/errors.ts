const envError = new Error(
  "Incorrect url to user microservice, please check .env file"
);

const incorrectDataError = new Error(
  "Entered data was incorrect, please try again with using correct request data"
);

const authorizationError = new Error(
  "This operation available only for authorized users! Please login and try again"
);

const wrongIdError = new Error(
  "Record with entered ID doesn't exist, please enter correct ID"
);

export { envError, incorrectDataError, authorizationError, wrongIdError };
