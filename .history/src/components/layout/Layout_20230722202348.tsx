import Header from "./Header/Header";
import Section from "./Section/Section";
import Container from "../Container/Container";
import Footer from "./Footer/Footer";
import { useTheme } from "styled-components";
import Menu from "./Menu/Menu";
import PreviewAvatar from "../Content/PreviewAvatar/PreviewAvatar";
import { useAppContext } from "../../context/AppContext";
import Skills from "../Content/MySkills/Skills";

//import sprite from "../../assets/icons/sprite.svg"

function Layout(){
    
    const theme = useTheme()
    const context = useAppContext()
    const {styles} = theme

    return (
        <>
            <Section _relative={'true'} bg_color={styles.colors.mainBg}>

                <Container>
                    <Menu />
                </Container>

                <Header hidden={context?.isToggled} />

                <PreviewAvatar />
               
            </Section>

            <Section bg_color={styles.colors.secondaryBg}>

                <Container>
                    
                    <Skills />

                </Container>
            
            </Section>


            <Footer></Footer>

        </>
    )
}

export default Layout