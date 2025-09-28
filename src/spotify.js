import axios from "axios";

const LOCALSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp'
}

const LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
}

// Clear all local storage items and navigate to homepage
export function logout() {
    for (const property in LOCALSTORAGE_KEYS) {
        window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
    }

    window.location = window.location.origin;
}


// Tokens expire over time per spotify API
function hasTokenExpired() {
    const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;

    if (!accessToken || !timestamp) return false;

    const millisecondsElapsed = Date.now() - Number(timestamp);
    return (millisecondsElapsed / 1000) > Number(expireTime)
}

async function refreshToken() {
    try {
        // Logout if no refresh token store or we've entered
        // an infinite loop
        if (!LOCALSTORAGE_VALUES.refreshToken ||
            LOCALSTORAGE_VALUES.refreshToken === 'undefined' ||
            (Date.now() - Number(LOCALSTORAGE_VALUES.timestamp)) < 1000) {
            console.error('No refresh token available');
            logout();
        }

        // Use '/refresh_token' path from our Node app
        const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`);

        // Update local storage
        window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

        // Reload page for local storage updates to update
        window.location.reload();
    } catch (e) {
        console.log(e)
    }
}

function getAccessToken() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
        [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    }
    const hasError = urlParams.get('error');

    // If error OR the local storage token has expired,
    // refresh the token.
    if (hasError || hasTokenExpired() ||
        LOCALSTORAGE_VALUES.accessToken === 'undefined') {
        refreshToken();
    }

    // If valid token is in local storage, return that.
    if (LOCALSTORAGE_VALUES.accessToken &&
        LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
        return LOCALSTORAGE_VALUES.accessToken
    }

    // If token can be found in query params, save all query params
    // to local storage and return the token.
    if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
        for (const property in queryParams) {
            window.localStorage.setItem(property, queryParams[property]);
        }

        // set timestamp
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

        return queryParams[LOCALSTORAGE_KEYS.accessToken];
    }

    // shouldn't ever get here
    return false
}


export const accessToken = getAccessToken();

axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Accept'] = 'application/json';


// Get Basic User info.  Avatar picture, name, id, etc.
export const getCurrentUserProfile = () => axios.get('/me');

// Liked Songs playlist ranked by most recent addition.  No limit noticed.
export const getCurrentUserTracks = (market, limit, offset) => {
    return axios.get(`/me/tracks?market=${market}&limit=${limit}&offset=${offset}`)
}

export const getTrackAudioFeatures = (tracksArray) => {
    let trackIds = [];
    for (const track in tracksArray) trackIds.push(tracksArray[track].track.id);

    const queryParams = trackIds.join('%2C');
    return axios.get(`/audio-features?ids=${queryParams}`)
}

// Post a playlist to a user's library, then load it with selected items,
// then open the playlist in a new tab at the spotify website
export const postPlaylist = (tracksArray, playlistName, user_id, setLoading) => {
    setLoading(true);
    let uris = [];
    for (const track in tracksArray) uris.push(tracksArray[track].uri)
    return axios({
        method: 'post',
        url: `/users/${user_id}/playlists`,
        data: {
            name: `${playlistName}`,
            public: "false"
        },
    })
        .then(response => {
            const playlist_id = response.data.id;
            return axios({
                method: 'post',
                url: `/playlists/${playlist_id}/tracks`,
                data: {
                    uris
                }
            }
            )
                .then(res => {
                    setLoading(false);
                    window.open(`https://open.spotify.com/playlist/${playlist_id}`, "_blank")
                })
                .catch(err => {
                    setLoading(false)
                    console.log(err)
                })
        })
        .catch(err => {
            setLoading(false)
            console.log(err);
        })
}