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
      <div
        style={{ textAlign: 'left', margin: '0 auto', display: 'inline-block' }}
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
      </div>
    </form>
  );
}

function Home() {
  return (
    <div>
      <h3>Welcome to the Home page!</h3>
      <p>this is not behind an authentication wall</p>
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
      {!isConfirmedUser && <pre>You have not confirmed your email.</pre>}
      <hr />
      <div>
        You can try pinging our authenticated API here. If you are logged in,
        you should be able to see a `user` info here.
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
      <Link to="/">Home</Link> |<Link to="dashboard">Dashboard</Link> |
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
  console.log('URL', process.env.URL);
  const identity = useNetlifyIdentity(process.env.URL);
  return (
    <IdentityContext.Provider value={identity}>
      <div className="App">
        <h1>Netlify Identity + Reach Router demo</h1>
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
