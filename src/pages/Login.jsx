import styled from 'styled-components';
import Spotify_Logo_Green from '../images/Spotify_Logo_Green.png'

const StyledLoginContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    height: 100vh;
    width: 100vw;
    padding: 0;

    h1 {
        cursor: default;
        margin-top: -3.5rem;
    }

    h3 {
        font-family: 'Roboto', sans-serif;
        letter-spacing: 1px;
        font-weight: 300;
        cursor: default;
    }

    img {
        position: absolute;
        top: 2.5%;
        right: 50%;
        translate: 50%;
        width: 20rem;

        @media (min-width: 425px) {
            right: 2.5%;
            translate: 0;
        }
    }

    a {
        background: var(--green);
        background: linear-gradient(90deg, var(--white) 0%, var(--green) 0%);
        padding: var(--spacing-md) var(--spacing-xxl);
        border-radius: var(--border-radius-pill);
        display: inline-block;
        font-size: var(--fz-lg);
        position: relative;
        overflow: hidden;
        z-index: 2;

        &:hover,
        &:focus {
            text-decoration: none;
            filter: brightness(1.1);
        }

        .animation {
            background: linear-gradient(90deg, var(--green) 5%, var(--white) 45%, var(--white) 55%, var(--green) 95%);
            min-width: 100%;
            height: 100%;
            position: absolute;
            left: 0%;
            top: 50%;
            translate: -100% -50%;
            text-decoration: none;
            animation: slideBackground 3s linear 2s infinite;
            z-index: -1;
            opacity: .5;
        }

        @keyframes slideBackground {
            from {
        left: -100%;
            }

            to {
        left: 400%;
            }
        }
    }
`

const LOGIN_URI =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:8000/login'
        : 'https://main.ds935drzhf7un.amplifyapp.com/login';

export default function Login() {

    return (
        <StyledLoginContainer>
            <img src={Spotify_Logo_Green} alt="Spotify Logo" />
            <h3>welcome to</h3>
            <h1>Sort My Liked</h1>
            <a href={LOGIN_URI}>
                <div className='animation'></div>
                <span>Log in</span>
            </a>
        </StyledLoginContainer>
    )
}
