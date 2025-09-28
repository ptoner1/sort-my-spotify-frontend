import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  background: linear-gradient(transparent, rgba(0,0,0,0.5));
  background-color: var(--grey-medium);
  height: 15vh;
  max-height: 32rem;
  min-height: 20rem;
  margin-bottom: 12rem;


  @media (min-width: 700px) {
    height: 22vw;
    margin-bottom: 0;
  }

  @media (min-width: 1450px) {
    width: var(--site-max-width);
  }

  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 20vh;
    background-color: var(--grey-medium);
    background-image: linear-gradient(rgba(0,0,0,0.6), var(--black));
    position: absolute;
    top: 100%;
    z-index: -1;
  }

  .header__inner {
    display: flex;
    align-items: flex-end;
    width: 100%;
    max-width: var(--site-max-width);
    margin: 0 auto;
    padding: var(--spacing-lg) var(--spacing-md);

    @media (min-width: 768px) {
      padding: var(--spacing-xl) var(--spacing-xxl);
    }

    button:disabled {
      display: none;
    }
  }

  img.header__img {
    width: 20%;
    max-width: 25rem;
    min-width: 12rem;
    margin-right: var(--spacing-lg);
    box-shadow: 0 4px 60px rgb(0 0 0 / 50%);
    background-color: var(--dark-grey);
    border-radius: ${props => props.type === 'user' ? '50%' : '0'};

    @media (min-width: 768px) {
      margin-right: var(--spacing-xl);
    }
  }

  .header__overline {
    text-transform: uppercase;
    font-size: var(--fz-xxs);
    margin-bottom: var(--spacing-xs);
    display: none;
    
    @media (min-width: 1000px) {
      display: block;
    }
  }

  h1.header__name {
    font-size: clamp(2.5rem, 7vw, 6rem);
    font-weight: 400;
    line-height: 1;
    margin: 0 0 var(--spacing-xs) 0;

    @media (min-width: 768px) {
      margin: 0 0 var(--spacing-xs) -.5rem;
    }
  }

  .header__meta {
    display: flex;
    align-items: center;
    font-size: clamp(1.2rem, 4.5vw, var(--fz-sm));
    color: var(--grey-light);
    margin: 0;

    span {
      display: flex;
      align-items: center;
      margin-right: 1.5rem;
      height: 3.3rem;

      &:not(:last-of-type)::after {
        content: '•';
        display: block;
        margin: 0 var(--spacing-xs);
        color: var(--grey-light);
        font-size: .8rem;
      }
    }
  }


  

  .button {
    &__add {

      &[disabled] {
        display: none;
      }

      position: absolute;
      bottom: -10rem;
      left: 50%;
      translate: -50%;
      font-size: var(--fz-xl);
      width: 55vw;
      height: 8rem;
      z-index: 20;
      border-radius: 50px;
      background-color: var(--grey-medium);

      &:hover {
        background-color: var(--grey-dark);
      }

      @media (min-width: 700px) {
        bottom: 1rem;
        left: clamp(30rem, 45vw, 47rem);
        height: auto;
        width: auto;
        min-width: 14rem;
        font-size: var(--fz-lg);
        translate: 0;
        padding: 1.5rem 2.5rem;
        background-color: var(--black-light);

        &:hover {
          background-color: var(--grey-medium);
        }
      }

      @media (min-width: 1450px) {
        left: 42rem;
      }
    }
}






  .header__spotify {
    
    &-logo,
    &-icon {
    width: 8rem;
    margin-bottom: 1.2rem;
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;

    @media (min-width: 700px) {
      width: 15rem;
      left: auto;
      right: .5rem;
      translate: -50%;
    }
  }

    &-icon {
      width: 2.7rem;

      @media (min-width: 400px) {
        display: none;
      }
    }

    &-logo {
      transition: all .3s;

      @media (max-width: 400px) {
        display: none;
      }
    }
}





  .header__menu {

    .menu {
      // MENU BEGINNING STATE
      &__button {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      background: radial-gradient(rgba(0,0,0,.4), var(--grey-medium));
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      padding: 0;
      cursor: pointer;
      z-index: 10;
      }
    
      &__hamburger {
        &,
        &::before,
        &::after {
          translate: -50% -50%;
          position: absolute;
          left: 50%;
          top: 50%;
          background-color: var(--grey-light);
          width: 2.5rem;
          height: 2px;
          transition: rotate .3s;
        }

        &::before,
        &::after {
          content: '';
          top: .7rem;
        }

        &::after {
          top: -.7rem;
          translate: -50% 0%;
        }
      }

        &__nav {
        width: 0;
        opacity: 0;
        position: absolute;
        top: 1.5rem;
        right: calc(1.5rem + 2.5rem);
        height: 5rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        transition: all .3s;
        overflow: hidden;
      }

      &__list {
        list-style: none;
        margin-right: 3.5rem;
        display: flex;
        gap: 1.5rem;
        width: calc(100% - 2rem - 1rem);
        padding: 0;
        justify-content: end;

        &__option {
          cursor: pointer;
          background-color: transparent;
          padding: 1rem 2rem;
          border-radius: var(--border-radius-pill);
          font-size: .8rem;
          color: transparent;
          translate: 300%;
          transition: all .2s;
        }
      }



      // MENU FUNCTIONALITY
      &__checkbox {
        display: none;

        &:checked + .menu__button .menu__hamburger {
          background: transparent;

          &::before,
          &::after {
            top: 0;
            rotate: 135deg;
          }

          &::after {
            rotate: -135deg;
          }
        }

        &:checked ~ .menu__nav {
          width: calc(100% - 7.5rem);
          opacity: 1;

          .menu__list > li {
          font-size: 1.2rem;
          color: var(--white);
          background-color: var(--grey-dark);
          translate: 0;
          
          &:hover {
            background-color: var(--grey-light);
          }
          }
        }

        &:checked ~ .header__spotify-logo {
          opacity: 0;
        }
      }
    }
  }
`;

export default StyledHeader;