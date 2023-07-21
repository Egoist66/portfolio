import DIV from "../../service/DIV/DIV";
import Header from "./Header/Header";
import Section from "./Section/Section";
import Container from "../Container/Container";
//import SVG from "../../service/SVG/SVG";
import Footer from "./Footer/Footer";

//import sprite from "../../assets/icons/sprite.svg"

function Layout(){
    return (
        <>
            <Section bgColor="">

                <Header hidden={true}/>

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