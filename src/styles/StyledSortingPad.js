import styled from 'styled-components';

const StyledSortingPad = styled.div`
    display: flex;
    justify-content: center;
    margin: 5rem 0;
    max-width: var(--site-max-width);


    .filter__button {
        display: flex;
        align-items: center;
        gap: .5rem;
        margin: 1rem;

        div,
        div::before,
        div::after {
            width: 2rem;
            height: 2px;
            background: white;
        }

        div::before,
        div::after {
            content: '';
            display: block;
            translate: 0 5px;
        }

        div::after {
            translate: 0 -7px;
        }
    }


    main {
        background: linear-gradient(transparent, rgba(0,0,0,0.5));
        background-color: var(--grey-medium);
        width: 100%;
        border-radius: 0px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 10;

        @media (min-width: 600px) {
            width: 90%;
            border-radius: 5px;
        }

        h3 {
            line-height: 3rem;
            cursor: default;
        }

        .wrapper{
            position: relative;
            width: 100%;
            background-color: var(--grey-dark);
            display: grid;
            padding: 2rem 4rem 4rem 4rem;
            grid-template-columns: 1fr;
            gap: 5rem;
            
            @media (min-width: 600px) {
                width: 80%;
                border-radius: 1rem;
                grid-template-columns: 1fr 1fr;
            }

            @media (min-width: 1300px) {
                grid-template-columns: 1fr 1fr 1fr;
            }

            .attribute__container {
                padding: 1rem 0;
        
                .attribute__title {
                    font-size: 2.2rem;
                    margin-bottom: 2rem;
                    cursor: default;
                }

                .range__container{
                    position: relative;
                    display: flex;

                    input[type="range"]{
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        appearance: none;
                        width: 100%;
                        outline: none;
                        position: absolute;
                        margin: 0;
                        height: 3rem;
                        top: 0;
                        bottom: 0;
                        background-color: transparent;
                        pointer-events: none;
                    }
                    .slider-track{
                        width: 100%;
                        height: 5px;
                        position: absolute;
                        margin: 1.25rem 0;
                        top: 0;
                        bottom: 0;
                        border-radius: 5px;
                    }
                    input[type="range"]::-webkit-slider-runnable-track{
                        -webkit-appearance: none;
                        height: 5px;
                    }
                    input[type="range"]::-moz-range-track{
                        -moz-appearance: none;
                        height: 5px;
                    }
                    input[type="range"]::-ms-track{
                        appearance: none;
                        height: 5px;
                    }
                    input[type="range"]::-webkit-slider-thumb{
                        -webkit-appearance: none;
                        height: 2.2rem;
                        width: 2.2rem;
                        background-color: var(--white);
                        cursor: pointer;
                        margin-top: -9px;
                        pointer-events: auto;
                        border-radius: 50%;
                    }
                    input[type="range"]::-moz-range-thumb{
                        -webkit-appearance: none;
                        height: 2.2rem;
                        width: 2.2rem;
                        cursor: pointer;
                        border-radius: 50%;
                        background-color: var(--white);
                        pointer-events: auto;
                    }
                    input[type="range"]::-ms-thumb{
                        appearance: none;
                        height: 2.2rem;
                        width: 2.2rem;
                        cursor: pointer;
                        border-radius: 50%;
                        background-color: var(--white);
                        pointer-events: auto;
                    }
                    input[type="range"]:active::-webkit-slider-thumb{
                        background-color: var(--white);
                        border: 3px solid var(--white);
                    }
                }

                .switch {
                    position: relative;
                    height: 36px;
                    width: 150px;
                    margin: 20px auto 0 auto;
                    background: rgba(0, 0, 0, 0.25);
                    border-radius: 3px;
                    -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
                    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
                  }
                  
                  .switch-label {
                    position: relative;
                    z-index: 2;
                    float: left;
                    width: 73px;
                    line-height: 36px;
                    font-size: 16px;
                    color: rgba(255, 255, 255, 0.35);
                    text-align: center;
                    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.45);
                    cursor: pointer;
                  }
                  .switch-label:active {
                    font-weight: bold;
                  }
                  
                  .switch-label-off {
                    padding-left: 2px;
                  }
                  
                  .switch-label-on {
                    padding-right: 2px;
                  }
                  
                  
                  .switch-input {
                    display: none;
                  }
                  .switch-input:checked + .switch-label {
                    font-weight: bold;
                    color: rgba(0, 0, 0, 0.65);
                    text-shadow: 0 1px rgba(255, 255, 255, 0.25);
                    -webkit-transition: 0.15s ease-out;
                    -moz-transition: 0.15s ease-out;
                    -ms-transition: 0.15s ease-out;
                    -o-transition: 0.15s ease-out;
                    transition: 0.15s ease-out;
                    -webkit-transition-property: color, text-shadow;
                    -moz-transition-property: color, text-shadow;
                    -ms-transition-property: color, text-shadow;
                    -o-transition-property: color, text-shadow;
                    transition-property: color, text-shadow;
                  }
                  .switch-input:checked + .switch-label-on ~ .switch-selection {
                    left: 75px;
                    /* Note: left: 50%; doesn't transition in WebKit */
                  }
                  
                  .switch-selection {
                    position: absolute;
                    z-index: 1;
                    top: 2px;
                    left: 2px;
                    display: block;
                    width: 73px;
                    height: 33px;
                    border-radius: 3px;
                    background-color: var(--green);
                    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #65bd63), color-stop(100%, var(--green)));
                    background-image: -webkit-linear-gradient(top, #65bd63, var(--green));
                    background-image: -moz-linear-gradient(top, #65bd63, var(--green));
                    background-image: -ms-linear-gradient(top, #65bd63, var(--green));
                    background-image: -o-linear-gradient(top, #65bd63, var(--green));
                    background-image: linear-gradient(top, #65bd63, var(--green));
                    -webkit-box-shadow: inset 0 1px rgba(255, 255, 255, 0.5), 0 0 2px rgba(0, 0, 0, 0.2);
                    box-shadow: inset 0 1px rgba(255, 255, 255, 0.5), 0 0 2px rgba(0, 0, 0, 0.2);
                    -webkit-transition: left 0.15s ease-out;
                    -moz-transition: left 0.15s ease-out;
                    -ms-transition: left 0.15s ease-out;
                    -o-transition: left 0.15s ease-out;
                    transition: left 0.15s ease-out;
                  }
            }

            .filter__buttons {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 2rem;

                &__small {
                    display: flex;
                    justify-content: space-around;
                    width: 100%;
                    min-height: 4rem;
                }

            .button {
                &__sort {
                    font-size: 2rem;
                    min-height: 4rem;
                    padding: 1.5rem 3rem;

                    @media (min-width: 1450px) {
                        font-size: 1.6rem;
                    }
                    
                    &:hover {
                        background-color: var(--green)
                    }
                }
                &__reset {
                    padding: 1rem 2rem;
                }
            }
            }
        }
    }
`

export default StyledSortingPad