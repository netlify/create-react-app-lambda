import React from 'react';
import { Router, Link, navigate } from '@reach/router';
import './App.css';
import { useNetlifyIdentity } from './useNetlifyIdentity';

let IdentityContext = React.createContext();

function PrivateRoute(props) {
  const identity = React.useContext(IdentityContext);
  let { as: Comp, ...rest } = props;
  return identity.user ? (
    <Comp {...rest} />
  ) : (
    <div>
      <h3>You are trying to view a protected page. Please log in</h3>
      <Login />
    </div>
  );
}

function Login() {
  const { loginUser, signupUser } = React.useContext(IdentityContext);
  const formRef = React.useRef();
  const [msg, setMsg] = React.useState('');
  const signup = () => {
    const email = formRef.current.email.value;
    const password = formRef.current.password.value;
    signupUser(email, password)
      .then(user => {
        console.log('Success! Signed up', user);
        navigate('/dashboard');
      })
      .catch(err => console.error(err) || setMsg('Error: ' + err.message));
  };
  return (
    <form
      ref={formRef}
      onSubmit={e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        loginUser(email, password)
          .then(user => {
            console.log('Success! Logged in', user);
            navigate('/dashboard');
          })
          .catch(err => console.error(err) || setMsg('Error: ' + err.message));
      }}
    >
      <div>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
      </div>
      <div>
        <input type="submit" value="Log in" />
        <button onClick={signup}>Sign Up </button>
        {msg && <pre>{msg}</pre>}
      </div>
    </form>
  );
}

function Home() {
  return (
    <div>
      <h3>Welcome to the Home page!</h3>
      <p>
        this is a <b>Public Page</b>, not behind an authentication wall
      </p>
      <p style={{ backgroundColor: '#EEE', padding: '1rem' }}>
        <div>
          <a
            href={`https://app.netlify.com/start/deploy?repository=https://github.com/netlify/create-react-app-lambda/tree/reachRouterAndGoTrueDemo&stack=cms`}
          >
            <img
              src="https://www.netlify.com/img/deploy/button.svg"
              alt="Deploy to Netlify"
            />
          </a>
        </div>
        This demo is{' '}
        <a href="https://github.com/netlify/create-react-app-lambda/tree/reachRouterAndGoTrueDemo">
          Open Source.
        </a>{' '}
      </p>
    </div>
  );
}

function About() {
  return <div>About</div>;
}

function Dashboard() {
  const props = React.useContext(IdentityContext);
  console.log({ props });
  const { isConfirmedUser, authedFetch } = props;
  const [msg, setMsg] = React.useState('Click to load something');
  const handler = () => {
    authedFetch.get('/.netlify/functions/authEndPoint').then(setMsg);
  };
  return (
    <div>
      <h3>This is a Protected Dashboard!</h3>
      {!isConfirmedUser && (
        <pre>
          You have not confirmed your email. Please confirm it before you ping
          the API.
        </pre>
      )}
      <hr />
      <div>
        <p>You can try pinging our authenticated API here.</p>
        <p>
          If you are logged in, you should be able to see a `user` info here.
        </p>
        <button onClick={handler}>Ping authenticated API</button>
        <pre>{JSON.stringify(msg, null, 2)}</pre>
      </div>
    </div>
  );
}
function Nav() {
  const { isLoggedIn } = React.useContext(IdentityContext);
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="dashboard">Dashboard</Link>
      {' | '}
      <span>
        {isLoggedIn ? <Logout /> : <Link to="login">Log In/Sign Up</Link>}
      </span>
    </nav>
  );
}
function Logout() {
  const { logoutUser } = React.useContext(IdentityContext);
  return <button onClick={logoutUser}>You are signed in. Log Out</button>;
}

function App() {
  // TODO: CHANGE THIS URL IF YOU ARE USING A DIFFERENT NETLIFY INSTANCE
  // e.g. 'https://unruffled-roentgen-04c3b8.netlify.com'
  const [url, setUrl] = React.useState(window.location.origin);
  const handler = e => setUrl(e.target.value);
  const identity = useNetlifyIdentity(url);
  return (
    <IdentityContext.Provider value={identity}>
      <div className="App">
        <div className="Appheader">
          <h1 className="title">
            Netlify Identity <span>&</span> Reach Router
          </h1>
          <label>
            <a href="https://www.netlify.com/docs/identity/">
              Netlify Identity
            </a>{' '}
            Instance:{' '}
            <input
              type="text"
              placeholder="your instance here e.g. https://unruffled-roentgen-04c3b8.netlify.com"
              value={url}
              onChange={handler}
              size={50}
            />
            <div>
              <div style={{ display: 'inline-block' }}>
                {window.location.hostname === 'localhost' ? (
                  <pre>WARNING: this demo doesn't work on localhost</pre>
                ) : (
                  <pre>
                    your instance here e.g.
                    https://unruffled-roentgen-04c3b8.netlify.com
                  </pre>
                )}
              </div>
            </div>
          </label>
        </div>
        <Nav />
        <Router>
          <Home path="/" />
          <About path="/about" />
          <Login path="/login" />
          <PrivateRoute as={Dashboard} path="/dashboard" />
        </Router>
      </div>
    </IdentityContext.Provider>
  );
}

export default App;
