import React, { useCallback, useState } from 'react';
import auth from './auth';
import './App.css';

const App = () => {
  const [state, setState] = useState({ email: '', password: '' });

  const handleFBClick = useCallback(() => {
    auth.auth0.authorize({
      connection: 'facebook',
      scope: 'openid profile email read:users read:user_idp_tokens',
    }, (err, res) => {
      if (err) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.innerHTML = err.description;
        errorMessage.style.display = 'block';
      } else {
        console.log('=======FACEBOOKLOGINRESULT', res);
      }
    });
  }, []);

  const handleGoogleClick = useCallback(() => {
    auth.auth0.authorize({
      connection: 'google-oauth2',
    }, err => {
      if (err) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.innerHTML = err.description;
        errorMessage.style.display = 'block';
      }
    });  }, []);

  const handleChange = useCallback(({ target }) => {
    const changes = { ...state };
    changes[target.name] = target.value;
    setState(changes);
  }, [state]);

  const handleLogin = useCallback(() => {
    auth.loginWithCredentials(state.email, state.password);
  }, [state]);


  return (
    <div className="App">
      <div>
        <button onClick={handleFBClick}>FACEBOOK</button>
        <button onClick={handleGoogleClick}>GOOGLE</button>
      </div>
      <div>
        <input value={state.email} onChange={handleChange} name="email" />
        <input value={state.password} onChange={handleChange} name="password" type="password" />
        <button onClick={handleLogin}>submit</button>
      </div>
    </div>
  );
}

export default App;
