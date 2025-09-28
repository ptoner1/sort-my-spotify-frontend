import styled from 'styled-components';

const StyledSortedTracksPopup = styled.div`
    .popup {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        transition: all .2s;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0,0,0,.5);
        overflow: auto;
        display: flex;
        flex-direction: column;
        align-items: center;

            &__banner {
                width: 100%;
                max-width: 1000px;
                background-color: rgba(0,0,0,.6);
                padding: 3rem;
                margin: 4rem 0;
                border-radius: 1rem;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 4rem;
                align-items: center;
                
                @media (min-width: 710px) {
                    grid-template-columns: 1fr 1fr 1fr;
                    grid-template-rows: min-content;
                    align-items: start;
                    font-size: inherit;
                    width: 80%;
                }


            &__button {
                background-color: var(--grey-medium);
                font-size: 1.6rem;
                padding: 1.5rem 3rem;
                position: relative;
                justify-self: start;
                margin: 0 2rem;
                
                @media (min-width: 710px) {
                    justify-self: center;
                    margin: 0;
                }

                &:hover {
                    background-color: var(--grey-light);
                }

                &[type="submit"] {
                    background-color: var(--green);

                    img {
                        width: 2rem;
                    }
                    &:hover {
                        filter: brightness(1.1);
                    }
                    
                    &:disabled:hover {
                        cursor: default;
                        background-color: transparent;
                        color: transparent;
                        
                        img {
                        width: 0;
                    }
                        
                        &::after {
                                content: attr(tooltip);
                                position: absolute;
                                left: 50%;
                                top: 50%;
                                translate: -50% -50%;
                                width: 130%;
                                min-width: 30rem; 
                                color: var(--white);
                                overflow: visible;
                                z-index: 101;
                            }
                    }
                    
                }
            }
            
            &__form {
                order: 3;
                grid-column-start: 1;
                grid-column-end: 3;
                gap: 2rem;
                justify-self: center;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: 100%;

                @media (min-width: 710px) {
                    order: 2;
                    grid-column-start: 2;
                }
    
                &__group {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }

                input,
                input:focus {
                    font-family: 'Roboto', sans-serif;
                    outline: none;
                    border: none;
                    border-radius: 5px;
                    font-size: 1.6rem;
                    height: 4rem;
                    padding: 1.5rem 1.5rem;
                    background-color: rgba(230,230,230,1);
                    text-align: start;
                    transition: scale .2s;

                    @media (min-width: 710px) {
                        height: 2rem;
                    }
                }

                input {
                    background-color: rgba(200,200,200,1);
                    text-align: center;
                }

                input:focus {
                    scale: 1.05;
                }
            }

            &__info {
                font-family: 'Roboto', sans-serif;
                font-weight: 500;
                letter-spacing: .4px;
                order: 3;
                justify-self: end;
                text-align: end;
                margin-right: 2rem;
                order: 2;
                font-size: 1.4rem;

                @media (min-width: 500px) {
                    text-align: start;
                    font-size: 1.6rem;
                }
            }
        }
    }
`

export default StyledSortedTracksPopup