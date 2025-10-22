import { useEffect, useState } from 'react';
import { accessToken, getCurrentUserProfile } from './spotify';
import { Login, Profile } from './pages/index';
import Alert from './components/Alert';
import { default as Spotify_Icon_Green } from './images/Spotify_Icon_Green.png'

//GlobalStyles file also contains css variables used in components
import { GlobalStyles } from './styles';

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [alert, setAlert] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setToken(accessToken);

    async function fetchData() {
      const { data } = await getCurrentUserProfile();
      setProfile(data)
    }

    fetchData()
      .then(res => {
        setLoading(false);
        const uri = window.location.toString();
        if (uri.indexOf('?')) {
          const clean_uri = uri.substring(0, uri.indexOf('?'));
          window.history.replaceState({}, document.title, clean_uri);
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        setAlert([err.response.data.error.status, err.response.data.error.message])
      })
  }, [])

  const renderAlert = () => {
    if (alert) {
      return <Alert code={alert[0]} msg={alert[1]} setAlert={setAlert} />
    }
  }

  function checkLoggedIn() {
    if (!token) return (
      <>
        <Alert code={331} msg={"Hey, I changed the hosting for this app recently, which broke the backend Oauth login process.  I plan to fix it for simple practice with AWS Lambda, but I'm in no rush because Spotify nerfed their API severely for applications in 'dev mode', -ruining the essential functions of this application.  If you would like to see a demo video from when I made this application click here: "} setAlert={setAlert} />
        <Login />
      </>
    )


    return (
      <>
        {renderAlert()}
        <Profile profile={profile} alert={alert} setAlert={setAlert} setLoading={setLoading} />
      </>
    )
  }


  return (
    <div className="App">
      <GlobalStyles />

      {loading ? (
        <img className="spinner" src={Spotify_Icon_Green} alt="Spotify Logo" />
      ) : (
        checkLoggedIn()
      )}

    </div>
  );
}

export default App;