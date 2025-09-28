import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  --black: #121212;
  --black-light: #181818;
  --grey-dark: #282828;
  --grey-medium: #535353;
  --grey-light: #b3b3b3;
  --white: #fff;
  --green: #1DB954;

  --font: 'Gotham Rounded', sans-serif;

  --fz-xxs: 1.2rem;
  --fz-xs: 1.3rem;
  --fz-sm: 1.4rem;
  --fz-md: 1.6rem;
  --fz-lg: 1.8rem;
  --fz-xl: 2.0rem;
  --fz-xxl: 2.4rem;

  --spacing--xxs: .4rem;
  --spacing-xs: .8rem;
  --spacing-sm: 1.2rem;
  --spacing-md: 1.6rem;
  --spacing-lg: 2.4rem;
  --spacing-xl: 3.2rem;
  --spacing-xxl: 6.4rem;

  --border-radius-subtle: 4px;
  --border-radius-pill: 3rem;

  --site-max-width: 1450px;
}

html {
  box-sizing: border-box;
  font-size: 62.5%;

  @media (min-width: 1450px) {
    font-size: 83.3%;
  }
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  background-color: var(--black);
  color: var(--white);
  font-family: var(--font);
  font-size: var(--fz-md);

  @media (min-width: 1450px) {
    display: flex;
    justify-content: center;
  }
}

h1, h2, h3, h4, h5, h6 {
  letter-spacing: -.04em;
  margin: 0 0 10px;
}

p {
  margin: 0 0 10px;
}

a,
button {
  transition: all 0.3s ease;
  color: inherit;
}

a {
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
}

button {
  border: 0;
  cursor: pointer;
  font-family: inherit;
  border-radius: var(--border-radius-pill);
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  padding: var(--spacing-xs) var(--spacing-sm);

  &:hover {
    background-color: var(--grey-medium);
    outline: 0;
  }

  &:active {
    background-color: rgba(0,0,0,.7);
    outline: 0;
  }

}

img {
  width: 100%;
  max-width: 100%;
  vertical-align: middle;
}

main {
  position: relative;
  padding: var(--spacing-xxl) 0;
}

.app {
  min-height: 100vh;
  position: relative;
}

.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: clamp(10rem, 10vw, 15rem);
  animation: bounce 1.2s linear infinite;
}

@keyframes bounce {
  0% {
    scale: 1;
  }

  50% {
    scale: 1.3;
  }

  100% {
    scale: 1;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.overflow-ellipsis {
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: unset;
  word-break: break-all;
}

.empty-notice {
  color: var(--grey-medium);
  font-size: var(--fz-lg);
  text-align: center;
  padding: var(--spacing-xxl);
  margin-top: 3rem;
  cursor: default;
}
`

export default GlobalStyles
