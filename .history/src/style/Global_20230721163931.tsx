import {createGlobalStyle} from 'styled-components'

const useThemeGlobalStyles = () => {

    const GlobalStyles = createGlobalStyle`

    body,html {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: ;
    }

    h1,h2 {
        font-family: 'Josefin Sans';
    }


    
`
}

export default useThemeGlobalStyles