import {createGlobalStyle} from 'styled-components'

const useThemeGlobalStyles = () => {

    const GlobalStyles = createGlobalStyle`

        body,html {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 2
        }

        h1,h2 {
            font-family: 'Josefin Sans';
        }



    
    `

    return GlobalStyles
}

export default useThemeGlobalStyles