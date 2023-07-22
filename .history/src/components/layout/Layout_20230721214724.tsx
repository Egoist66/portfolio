import DIV from "../../service/DIV/DIV";
import Header from "./Header/Header";
import Section from "./Section/Section";
import Container from "../Container/Container";
//import SVG from "../../service/SVG/SVG";
import Footer from "./Footer/Footer";
import { useTheme } from "styled-components";
import Menu from "./Menu/Menu";
import PreviewAvatar from "../Content/PreviewAvatar/PreviewAvatar";
import { useAppContext } from "../../context/AppContext";

//import sprite from "../../assets/icons/sprite.svg"

function Layout(){
    const theme = useTheme()
    const context = useAppContext()
    const {styles} = theme

    return (
        <>
            <Section bg_color={styles.colors.mainBg}>

                <Container>
                    <Menu />
                </Container>

                <Header class_name={context?.isToggled ? 'active' : ''} hidden={context?.isToggled} />

                <PreviewAvatar />
               
            </Section>

            <Section>
                <Container id="container">
                    
                </Container>
            
            </Section>


            <Footer></Footer>

        </>
    )
}

export default Layout