import { createGlobalStyle } from "styled-components";

export const pseudoLinkElem = `
        
    &::after {
        content: '';
        height: 17px;
        position: absolute;
        left: 0;
        bottom: -13px;
        width: 0%;
        overflow: hidden;
        transition: 0.3s all ease;
        background-color: #7572D5;
    }

        &:hover::after {
            content: '';
            height: 17px;
            position: absolute;
            left: 0;
            bottom: -13px;
            width: 100%;
            overflow: hidden;
            transition: 0.3s all ease;
            background-color: #7572D5;
        }

    `;
const GlobalStyles = createGlobalStyle`

        body,html {
            margin: 0;   
            scroll-behavior: smooth;
            padding: 0;
            color: ${({ theme }) => theme.styles.colors.textColor};
            box-sizing: border-box;
            font-family: ${({ theme }) => theme.styles.font.fontFamilies[0]}
        }

        h1 {
            position: relative;
            z-index: 22222;
            &::after {
                content: '';
                height: 19px;
                z-index: -2;
                position: absolute;
                left: 140px;
                bottom: 0;
                width: 76%;
                overflow: hidden;
                background-color: ${({ theme }) =>
                  theme.styles.colors.decorColor} ;
            }
        }

        h1,h2, li, a {
            font-family: ${({ theme }) => theme.styles.font.fontFamilies[1]};
            margin: 0;
            letter-spacing: 2.5px;
        }

        p {
            margin: 10px 0px !important;
        }

        a {
            text-decoration: none;
            color: #fff;
        }

        img {
            max-width: 100%;
        }

        ul {
            padding: 0;
            margin: 0;
            list-style: none;

        }

        #main-nav ul li {
            margin-bottom: 20px;
            & a {
                text-decoration: none;
                font-size: 50px;
                letter-spacing: normal !important;
                color: ${({ theme }) => theme.styles.colors.decorColor};
                position: relative;
                overflow: hidden;
                display: 'inline-block';

                &::before {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    width: 0%;
                    height: 3px;
                    background-color: #fff;
                    opacity: 0;
                    -webkit-transition: all .2s;
                    transition: all .2s;
                }

                &:hover::before {
                    left: 0;
                    width: 100%;
                    opacity: 1;
                }
            }
        }


        #works-nav-list {
            & li a {
                color: #fff;
                text-decoration: none;
                text-transform: uppercase;
                position: relative;
                transition: 0.3s all ease;


               
            }

            & li a::after {
                content: '';
                height: 17px;
                position: absolute;
                left: 0;
                bottom: -13px;
                width: 0%;
                overflow: hidden;
                transition: 0.3s all ease;
                background-color: ${({ theme }) =>
                  theme.styles.colors.decorColor};
            }

    
        }

        #works-nav-list a.active::after {
            content: '';
            height: 17px;
            position: absolute;
            left: 0;
            bottom: -13px;
            width: 100%;
            overflow: hidden;
            transition: 0.3s all ease;
            background-color: ${({ theme }) => theme.styles.colors.decorColor};
        }



      @media (max-width: 710px){
        #skills-grid {
            display: block;
        }
      }



    
    `;

export default GlobalStyles;
