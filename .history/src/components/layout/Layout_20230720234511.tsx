import DIV from "../../service/DIV/DIV";
import Header from "./Header/Header";
import Section from "./Section/Section";
import Container from "../Container/Container";
import SVG from "../../service/SVG/SVG";

function Layout(){
    return (
        <>
            <Section>
                <Header>
                    <DIV>Hello</DIV>
                </Header>
            </Section>

            <Section>
                <Container className='App-container'>
                    <SVG 
                    width="100" 
                    height="100" 
                    params={{path: sprite, id: "#react"}} 
                    />
                </Container>
            
            </Section>

        </>
    )
}

export default Layout