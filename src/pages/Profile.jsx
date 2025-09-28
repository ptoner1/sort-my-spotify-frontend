import { useEffect, useState } from 'react';
import { getTrackAudioFeatures, getCurrentUserTracks } from '../spotify';
import { TrackList, SortingPad, Header } from '../components';



// I'll admit I made this component complicated.

// Spotify only allows you to request 50 tracks at a time.  I have friends that have well over 1500 'liked songs'.
// I tried setting up a while loop to get them all in one instance, but spotify seems to be preventing that.
// Instead, we give the user a button to click, over and over.
// I wanted their data to be stored locally so they don't have to click and click every time they log in, which
// also helps to minimize our requests to the Spotify API.

export default function Profile({ profile, setAlert, setLoading }) {

    // Load tracks saved from the user's last visit to initialize tracks state.
    // Initialize requests state from this information as well.
    const songs = JSON.parse(window.localStorage.getItem('spotify_liked_songs'));
    let reqs = songs ? parseInt(songs.length / 50) : 0;

    // If we've hit the backend of a user's 'liked songs' history, we can then allow the user
    // to fetch songs from the beginning of their history, allowing them to add songs they may
    // have 'liked' on Spotify since their last visit here.
    const perfectSongHistory = JSON.parse(window.localStorage.getItem('Sort_my_liked_songs_history'));
    if (perfectSongHistory) reqs = 0;

    const [tracks, setTracks] = useState(songs || []);
    const [requests, setRequests] = useState(reqs);



    useEffect(() => {
        if (!songs) setAlert([399,"Spotify recently removed crucial functions from their API.  Sadly, this has broken this app.  I'm researching a workaround for the Spotify API using 3rd party services in place of Spotify's 'get audio features' API.  I may have to do some machine learning of my own.  Stay tuned.", ]);
        // if (!songs) return setAlert([300, "Welcome! Press the 'add songs' button to gather your liked songs from Spotify, 50 at a time"])
        // if (songs.length <= 50) return setAlert([393, "Please reach out if this website isn't working in any way.  I want to help. -Paul"])
    }, [])


    // This function fetches songs from the Spotify API and updates the 'tracks' state.
    async function addTracks(e) {
        // We disable the addTracks button during operation to ensure smooth data flow,
        // one request at a time.
        if (e) e.target.disabled = true;
        if (!songs) setAlert([393, "Please reach out if this website isn't working in any way.  I want to help. -Paul"]);

        const reqLimit = 50;
        const offset = requests * reqLimit;
        const likedTracks = await getCurrentUserTracks('US', `${reqLimit}`, `${offset}`)
            .catch(err => { console.log(err); setAlert([err.response.data.error.status, err.response.data.error.message]) });

        // If the response from the Spotify API is an empty array, we've gathered all liked songs.
        // Disable the appropriate button and create a local storage item letting us know in the future.
        if (!likedTracks.data.items.length) {
            window.localStorage.setItem('Sort_my_liked_songs_history', JSON.stringify(true))
            if (e) return setAlert([200, 'Gathered all songs'])
            const btn = document.getElementById('liked-history');
            return btn.disabled = true;
        };

        // Gather audio_features for each song.
        const featuresData = await getTrackAudioFeatures(likedTracks.data.items)
            .catch(err => { console.log(err); setAlert([err.response.data.error.status, err.response.data.error.message]) });
        const features = featuresData.data.audio_features;

        // Merge audio_features array with likedTracks into a new array based on song id.
        // (the above function doesn't return most of the track information you'd want from getCurrentUserTracks())
        function mergeTrackInfo(tracks) {
            let trackList = [];
            for (const featureSet in features) {
                let [foundTrack] = tracks.filter(track => track.track.id === features[featureSet].id);
                trackList.push({ addedAt: foundTrack.added_at, ...foundTrack.track, ...features[featureSet] })
            }
            return trackList
        }

        const detailedTracks = mergeTrackInfo(likedTracks.data.items);
        let array = Array.from(tracks);

        // if we've set requests state to zero using local storage 'Sort_my_liked_songs_history',
        // it's because we now want to check the Spotify API for songs that a user has "liked"
        // since first using this app, and append them to the beginning of the tracks array
        if (reqs === 0 && songs) {
            let newestSongs = songs.slice(requests * 50, requests * 50 + 50);
            if (newestSongs[0].addedAt === detailedTracks[0].addedAt) {
                return setAlert([200, 'No new songs to add']);
            }
            if (newestSongs[0].addedAt < detailedTracks[0].addedAt) {
                const filteredDetailedTracks = detailedTracks.filter(dt => dt.addedAt > newestSongs[0].addedAt);
                setTracks([...filteredDetailedTracks, ...array]);
                window.localStorage.setItem('spotify_liked_songs', JSON.stringify([...filteredDetailedTracks, ...array]))
                if (filteredDetailedTracks.length === 50 && e) {
                    e.target.disabled = false;
                    setRequests(requests + 1)
                    return setAlert([201, "Be sure to click the 'Add Songs' button until this message stops appearing"])
                } else {
                    setRequests(reqs)
                    return setAlert([200, 'All new songs up to date'])
                }
            }
        }

        // If the oldest song in local storage is equally as old as the oldest song from our axios request,
        // we've gathered everything from the end of a user's liked songs history. Set local storage item and return.
        if (songs) {
            let oldestSongs = songs.slice(-50);
            if (oldestSongs[49].addedAt === detailedTracks[detailedTracks.length - 1].addedAt) {
                window.localStorage.setItem('Sort_my_liked_songs_history', JSON.stringify(true))
                return setAlert([200, 'Gathered all songs']);
            }
        }

        setRequests(requests + 1)
        setTracks([...array, ...detailedTracks]);
        window.localStorage.setItem('spotify_liked_songs', JSON.stringify([...array, ...detailedTracks]))
        if (e) e.target.disabled = false;
    }





    // Fetch and append tracks to the end of the tracks array.
    function getOldTracks(e) {
        if (requests !== reqs) return setRequests(reqs);
        addTracks(e)
    }

    // Render an Add Songs button depending on whether we've hit the bottom of a user's 'liked songs history'
    const newTracksBtn = () => {
        if (perfectSongHistory) return <button onClick={addTracks} className='button__add'>Add new songs</button>
        if (!perfectSongHistory) return <button onClick={getOldTracks} className='button__add' id="liked-history">Add songs</button>
    }

    return (
        <>
            {profile && (
                <>
                    <Header
                        profile={profile}
                        newTracksBtn={newTracksBtn}
                        tracks={tracks}
                        setAlert={setAlert}
                    />

                    <SortingPad
                        tracks={tracks}
                        user_id={profile.id}
                        setLoading={setLoading}
                    />

                    <TrackList
                        className="blurOnPopup"
                        tracks={tracks}
                        setTracks={setTracks}
                    />
                </>
            )}
        </>
    )
};
