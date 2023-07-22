import {createGlobalStyle} from 'styled-components'


    const GlobalStyles = createGlobalStyle`

        body,html {
            margin: 0;
            padding: 0;
            color: ${({theme}) => theme.styles.colors.textColor};
            box-sizing: border-box;
            font-family: ${({theme}) => theme.styles.font.fontFamilies[0]}
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
            }
        }



    
    `

  
export default GlobalStyles