import styled from 'styled-components'

const StyledAlert = styled.div`
position: relative;

.alert {
    position: absolute;
    top: 1rem;
    left: 50%;
    translate: -50%;
    padding: 1rem 1rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    z-index: 1000;
    animation: slideDown .1s ease-in;
    display: none;
    min-width: 20rem;
    max-width: var(--site-max-width);
  }

  .visible {
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
  }

  @keyframes  slideDown {
    from {
        translate: -50% -50%;
    }

    to {
        translate: -50% 0%;
    }
  }


  
  .error {
    color: #842029;
    background-color: #f8d7da;
    border-color: #f5c2c7;
  }
  
  .warning {
    color: #664d03;
    background-color: #fff3cd;
    border-color: #ffecb5;
  }
  
  .success {
    color: #0f5132;
    background-color: #d1e7dd;
    border-color: #badbcc;
    text-align: center;
    align-items: center;
    animation: fadeInOut 1.2s;

    p {
        translate: 0 25%;
    }
  }

  @keyframes fadeInOut {
    0% {
        translate: -50% -25%;
    }

    15% {
        translate: -50% 0%;
    }

    80% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
  }
  

  /* The close button */
  .closebtn {
    position: absolute;
    right: 1px;
    top: -5px;
    color: var(--grey-light);
    font-weight: bold;
    font-size: 22px;
    cursor: pointer;
    transition: 0.3s;
  }
  
  /* When moving the mouse over the close button */
  .closebtn:hover {
    color: white;
  }
  `

export default StyledAlert