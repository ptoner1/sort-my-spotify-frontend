import { StyledHeader } from "../styles";
import { logout } from "../spotify";
import Spotify_Logo_White from '../images/Spotify_Logo_White.png';
import Spotify_Icon_Green from '../images/Spotify_Icon_Green.png';

export default function Header({ profile, newTracksBtn, tracks }) {


    function resetTracks() {
        window.localStorage.removeItem('spotify_liked_songs');
        window.localStorage.removeItem('Sort_my_liked_songs_history');
        setTimeout("location.reload(true);", 100);
    }
    return (
        <StyledHeader type="user" className="blurOnPopup">
            <div className="header__inner">
                {profile.images.length && profile.images[0].url && (
                    <img className="header__img" src={profile.images[0].url} alt="User Profile" />
                )}
                <div>
                    <div className="header__overline">Profile</div>
                    <h1 className="header__name">{profile.display_name}</h1>
                    <p className="header__meta">
                        <span>
                            {tracks.length} Liked Song{tracks.length !== 1 ? 's' : ''}
                        </span>
                    </p>
                </div>
            </div>

            {newTracksBtn()}

            <menu className="header__menu">

                <input id="checkbox" type="checkbox" className="menu__checkbox" />
                <label htmlFor="checkbox" className="menu__button">
                    <div className="menu__hamburger" />
                </label>

                <img className="header__spotify-icon" src={Spotify_Icon_Green} alt="Spotify Logo" />
                <img className="header__spotify-logo" src={Spotify_Logo_White} alt="Spotify Logo" />

                <nav className="menu__nav">
                    <ul className="menu__list">
                        <li className="menu__list__option" onClick={resetTracks}>Reset Data</li>
                        <li className="menu__list__option" onClick={logout}>Logout</li>
                    </ul>
                </nav>

            </menu>
        </StyledHeader>
    )
}