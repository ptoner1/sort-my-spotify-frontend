import { StyledAlert } from "../styles";
import { logout } from "../spotify";

export default function Alert({ code, msg, setAlert }) {

    // Set style
    let type = 'success';
    if (code === undefined) type = '';
    if (code === 201) type = 'warning';
    if (code >= 300) type = 'warning';
    if (code >= 400) type = 'error';
    if (code === 393) setTimeout(() => setAlert([]), 3000)
    if (code < 300) setTimeout(() => setAlert([]), 1200)

    // A custom message for the most likely error to be found.
    const text = code === 401 ? "You're logged out. -- try refreshing the page or log back in manually" : msg;

    const serverError = (
        <>
            <h2>Error {code}</h2>
            <p>--This website has asked too much of spotify at one time.
                Try again in an ~hour--</p>
        </>
    )
    const visible = code ? 'visible' : '';

    function closeAlert() {
        if (code == 399) {
            setAlert([300, "Welcome! Press the 'add songs' button to gather your liked songs from Spotify, 50 at a time"])
        }
        else setAlert([]);
    }

    return (
        <StyledAlert>
            <div className={`alert ${type} ${visible}`}>
                {/* <span className={'closebtn'} onClick={() => setAlert([])}> */}
                <span className={'closebtn'} onClick={closeAlert}>
                    &times;
                </span>
                {code >= 400 ? <h2>Error {code}</h2> : ''}
                {code >= 500 ? serverError : ''}
                <p>{text}</p>
                {code === 401
                    ? <button onClick={logout}>Log in</button>
                    : ''}
            </div>
        </StyledAlert>
    )
}