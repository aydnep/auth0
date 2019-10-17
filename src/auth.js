import auth0 from 'auth0-js';

class Auth {
  constructor() {
    this.requestedScopes = 'openid profile email read:users read:user_idp_tokens update:users';
    this.auth0 = new auth0.WebAuth({
      domain: 'auth.2key.network',
      clientID: 'MZq8aIgGlO3Dmn5e0I2cv7xEVp7nVV71',
      redirectUri: window.location.origin,
      audience: 'https://test.api.2key.network',
      responseType: 'token id_token',
      scope: this.requestedScopes,
      // state: 'aklsjhdnln12li3uh8sa$!*12309',
    });
    window.auth0 = this.auth0;
    const { location: { hash } } = window;
    if (/access_token|id_token|error/.test(hash)) {
      console.log('index CDM');
      console.log(hash);
      this.handleAuthentication().then(token => {
        window.location.hash = '';
      }).catch(err => {
        console.error(err);
      });
    }
  }

  loginWithCredentials(email, password) {
    return new Promise(async(resolve, reject) => {
      this.auth0.login({
        email,
        password,
        realm: 'Username-Password-Authentication',
      }, (err, res) => {
        if (err) {
          console.warn(err);
          reject(err);
        } else {
          console.log(res);
          resolve(res);
        }
      });
    });
  }

  handleAuthentication = async opts => {
    new Promise((resolve, reject) => {
      this.auth0.parseHash(opts, (err, authResult) => {
        console.log('authResult', authResult);
        if (authResult && authResult.accessToken && authResult.idToken) {
          resolve(authResult)
        } else if (err) {
          console.warn(`Error: ${err.error}. Check the console for further details.`);
          console.warn(err);
          reject(err);
        }
      });
    }).catch(err => {
      console.error(err);
    })
  }
}

const auth = new Auth()

export default auth;
