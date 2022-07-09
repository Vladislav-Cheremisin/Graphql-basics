class JwtOperations {
  private jwt: null | String;

  constructor() {
    this.jwt = null;
  }

  public setJwtToken = (jwtToken: String) => {
    this.jwt = jwtToken;
  };

  public getJwtToken = (): null | String => {
    return this.jwt;
  };
}

const jwtOps = new JwtOperations();

export default jwtOps;
