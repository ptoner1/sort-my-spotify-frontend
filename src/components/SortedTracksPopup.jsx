import { useState } from "react";
import TrackList from "./TrackList";
import { postPlaylist } from "../spotify";
import Spotify_Icon_White from '../images/Spotify_Icon_White.png';
import { StyledSortedTracksPopup } from "../styles";


export default function SortedTracksPopup({ setLoading, user_id, setDisplayPopup, sortedTracks, setSortedTracks }) {

    const [playlistName, setPlaylistName] = useState("'New Playlist'");

    function exitPopup(e) {
        e.preventDefault();
        setDisplayPopup(false);
        if (!playlistName.length) setPlaylistName('New Playlist');
        document.body.style.overflow = "auto";
        const backgroundContainers = document.getElementsByClassName('blurOnPopup');
        Array.from(backgroundContainers).forEach(e => e.style.filter = "blur(0px)");
    }

    function playlistTimeLength() {
        const timeLength = sortedTracks.reduce(
            (acc, curr) => acc + curr.duration_ms,
            0)
        const hrsWithDecimal = timeLength / 1000 / 60 / 60;
        const hrs = parseInt(hrsWithDecimal);
        const decimalIndex = `${hrsWithDecimal}`.indexOf('.');
        const mins = parseInt(Number(`${hrsWithDecimal}`.slice(decimalIndex, 6)) * 60);
        if (hrs === 0) return `${mins} mins`
        if (hrs > 0) return `${hrs} hrs ${mins} mins`
    }

    function handleSubmit(e) {
        e.preventDefault()
        postPlaylist(sortedTracks, playlistName, user_id, setLoading)
    }

    function focusInput() {
        if (playlistName === "'New Playlist'") setPlaylistName('')
    }

    return (
        <StyledSortedTracksPopup>
            <div className="popup">

                <div className="popup__banner">
                    <button className="popup__banner__button" onClick={exitPopup}>Back</button>

                    <form className="popup__banner__form" method="post" onSubmit={handleSubmit}>
                        <div className="popup__banner__form__group">
                            <label htmlFor="name">Playlist Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                onFocus={focusInput}
                                placeholder="required"
                                value={playlistName}
                                required
                                onChange={e => setPlaylistName(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="popup__banner__button"
                            tooltip="100 song max, sorry!"
                            disabled={sortedTracks.length > 100}
                        >
                            Save to Library &nbsp;
                            <img src={Spotify_Icon_White} alt="Spotify Logo" />
                        </button>
                    </form>
                    <div className="popup__banner__info">
                        <p>{sortedTracks.length} song{sortedTracks.length === 1 ? '' : 's'}</p>
                        <p>{playlistTimeLength()}</p>
                    </div>
                </div>

                <TrackList
                    tracks={sortedTracks}
                    setTracks={setSortedTracks}
                />

            </div>
        </StyledSortedTracksPopup>
    )
}