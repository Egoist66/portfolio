import {createGlobalStyle} from 'styled-components'


    const GlobalStyles = createGlobalStyle`

        body,html {
            margin: 0;
            padding: 0;
            color: ${({theme}) => theme.styles.colors.textColor};
            box-sizing: border-box;
            font-family: ${({theme}) => theme.styles.font.fontFamilies[0]}
        }

        h1,h2 {
            font-family: ${({theme}) => theme.styles.font.fontFamilies[1]};
            margin: 0;
            letter-spacing: 2.5px;
        }

        p {
            margin-bottom: 10px;
        }

        img {
            max-width: 100%;
        }



    
    `

  
export default GlobalStyles