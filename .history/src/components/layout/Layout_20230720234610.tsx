import DIV from "../../service/DIV/DIV";
import Header from "./Header/Header";
import Section from "./Section/Section";
import Container from "../Container/Container";
import SVG from "../../service/SVG/SVG";
import Footer from "./Footer/Footer";

function Layout(){
    return (
        <>
            <Section>
                <Header>
                    <DIV>Hello</DIV>
                </Header>
            </Section>

            <Section>
                <Container id="container">
                    <SVG 
                    width="100" 
                    height="100" 
                    params={{path: sprite, id: "#react"}} 
                    />
                </Container>
            
            </Section>


            <Footer></Footer>

        </>
    )
}

export default Layout