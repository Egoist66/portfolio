
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

export const themeStyle: ThemeStyleInteface =  {
    styles: {
        fontFamily: ['Poppins', 'Josefin Sans'],
        colors: {
            mainBg: '#1F1F20',
            secondaryBg: '#252527',
            textColor: '#fff',
            decorColor: '#7572D5'
        }
    }
}