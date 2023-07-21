import DIV from "../../service/DIV/DIV";
import Header from "./Header/Header";
import Section from "./Section/Section";
import Container from "../Container/Container";
//import SVG from "../../service/SVG/SVG";
import Footer from "./Footer/Footer";
import { useTheme } from "styled-components";
import Menu from "./Menu/Menu";

//import sprite from "../../assets/icons/sprite.svg"

function Layout(){
    const theme = useTheme()
    const {styles} = theme

    return (
        <>
            <Section bgColor={styles.colors.mainBg}>
                
                <Menu />
               
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