import {createGlobalStyle} from 'styled-components'


    const GlobalStyles = createGlobalStyle`

        body,html {
            margin: 0;
            padding: 0;
            color: ${({theme}) => theme.styles.colors.textColor};
            box-sizing: border-box;
            font-family: ${({theme}) => theme.styles.font.fontFamilies[0]}
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
                background-color: ${({theme}) => theme.styles.colors.decorColor} ;
            }
        }

        h1,h2, li, a {
            font-family: ${({theme}) => theme.styles.font.fontFamilies[1]};
            margin: 0;
            letter-spacing: 2.5px;
        }

        p {
            margin: 10px 0px !important;
        }

        img {
            max-width: 100%;
        }

        ul {
            padding: 0;
            list-style: none;

        }

        nav ul li {
            margin-bottom: 20px;
            & a {
                text-decoration: none;
                font-size: 50px;
                letter-spacing: normal !important;
                color: ${({theme}) => theme.styles.colors.decorColor};
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

        .skills-cards > div {
            position: relative;

            & > div::after {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                background-color: #333;
                width: 50;
                margin: 0 auto;
                padding: 30px;
            }
        }



    
    `

  
export default GlobalStyles