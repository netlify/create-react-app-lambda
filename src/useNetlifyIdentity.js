import React from 'react';
import GoTrue from 'gotrue-js';
import useLocalState from './useLocalState';

export function useNetlifyIdentity(domain, onAuthChange = () => {}) {
  const authRef = React.useRef(
    new GoTrue({
      APIUrl: `${domain}/.netlify/identity`,
      setCookie: true
    })
  );

  const [user, setUser, clearUser] = useLocalState(
    'netlifyIdentityUserDemo',
    onAuthChange
  );
  const _setUser = _user => {
    if (!_user) clearUser();
    else setUser(_user);
    onAuthChange(_user); // if someone's subscribed to auth changes, let 'em know
    return _user; // so that we can continue chaining
  };
  /******* OPERATIONS */
  // make sure the Registration preferences under Identity settings in your Netlify dashboard are set to Open.
  const signupUser = (email, password) =>
    authRef.current.signup(email, password).then(_setUser); // TODO: make setUser optional?
  const loginUser = (email, password) =>
    authRef.current.login(email, password).then(_setUser);
  const requestPasswordRecovery = email =>
    authRef.current.requestPasswordRecovery(email);
  const recoverAccount = token => authRef.current.recover(token);
  const updateUser = fields => {
    const user = authRef.current.currentUser();
    return user
      .update(fields) // e.g. { email: "example@example.com", password: "password" }
      .then(_setUser);
  };
  const getFreshJWT = () => {
    const user = authRef.current.currentUser();
    return user.jwt();
  };
  const logoutUser = () => {
    const user = authRef.current.currentUser();
    return user.logout().then(() => _setUser(null));
  };

  const genericAuthedFetch = method => (endpoint, obj = {}) => {
    if (!user || !user.token || !user.token.access_token)
      throw new Error('no user token found');
    const defaultObj = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token.access_token
      }
    };
    const finalObj = Object.assign(defaultObj, { method }, obj);
    return fetch(endpoint, finalObj).then(res =>
      finalObj.headers['Content-Type'] === 'application/json' ? res.json() : res
    );
  };
  const authedFetch = {
    get: genericAuthedFetch('GET'),
    post: genericAuthedFetch('POST'),
    put: genericAuthedFetch('PUT'),
    delete: genericAuthedFetch('DELETE')
  };

  // // confirmation
  // http://lea.verou.me/2011/05/get-your-hash-the-bulletproof-way/
  React.useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash.slice(0, 19) === 'confirmation_token=') {
      // we are in a confirmation!
      const token = hash.slice(19);
      authRef.current
        .confirm(token)
        .then(_setUser)
        .catch(console.error);
      // .then(
      //   () =>
      //     (window.location =
      //       window.location.origin + window.location.pathname) // strip hash
      // )
    }
  }, []);

  /******* hook API */
  return {
    user,
    setUser, // use carefully!! mostly you should use the methods below
    isConfirmedUser: !!(user && user.confirmed_at),
    isLoggedIn: !!user,
    signupUser,
    loginUser,
    logoutUser,
    requestPasswordRecovery,
    recoverAccount,
    updateUser,
    getFreshJWT,
    authedFetch
  };
}
