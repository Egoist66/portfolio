import { useTheme } from "styled-components";
import Header from "./Header/Header";
import Section from "./Section/Section";
import Container from "../Container/Container";
import Footer from "./Footer/Footer";
import Menu from "./Menu/Menu";
import PreviewAvatar from "../Content/PreviewAvatar/PreviewAvatar";
import { useAppContext } from "../../context/AppContext";
import Skills from "../Content/MySkills/Skills";
import Works from "../Content/MyWorks/Works";
import Testimony from "../Content/Testimony/Testimony";
import Contact from "../Content/Contact/Contact";
import Socials from "../Content/Socials/Socials";

function Layout() {
  const context = useAppContext();
  const { colors } = useTheme().styles;

  return (
    <>
      <Section id="/" _relative="true" hero bg_color={colors.mainBg}>
        <Menu />
        <Header hidden={context?.isToggled} />
        <PreviewAvatar />
      </Section>

      <Section id="skills" bg_color={colors.secondaryBg}>
        <Container>
          <Skills />
        </Container>
      </Section>

      <Section id="works" bg_color={colors.mainBg}>
        <Container>
          <Works />
        </Container>
      </Section>

      <Section id="about-me" bg_color={colors.secondaryBg}>
        <Container>
          <Testimony />
        </Container>
      </Section>

      <Section id="contact" bg_color={colors.mainBg}>
        <Container>
          <Contact />
        </Container>
      </Section>

      <Footer>
        <Section id="socials" bg_color={colors.secondaryBg}>
          <Container>
            <Socials />
          </Container>
        </Section>
      </Footer>
    </>
  );
}

export default Layout;
