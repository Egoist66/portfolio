
interface ThemeStyleInteface {
    styles: {
        fontFamily: Array<string>,
        colors: {
            mainBg: string,
            secondaryBg: string,
            textColor: string,
            decorColor: string
        },

        font: {
            fontFamilies: Array<string>
        }
    }
}

const themeStyle =  