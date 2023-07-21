import DIV from "../../service/DIV/DIV";
import Header from "./Header/Header";
import Section from "./Section/Section";
import Container from "../Container/Container";
import SVG from "../../service/SVG/SVG";
import Footer from "./Footer/Footer";

import sprite from "../../assets/icons/sprite.svg"

function Layout(){
    return (
        <>
            <Section>
                <Header hidden={true}/>

                <h1>Hello</h1>
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