import { useTheme } from "styled-components";
import Section from "./Section/Section";
import Container from "../Container/Container";
import Footer from "./Footer/Footer";
import PreviewAvatar from "../Content/PreviewAvatar/PreviewAvatar";
import Skills from "../Content/MySkills/Skills";
import Works from "../Content/MyWorks/Works";
import Games from "../Content/MyGames/Games";
import Testimony from "../Content/Testimony/Testimony";
import Contact from "../Content/Contact/Contact";
import Socials from "../Content/Socials/Socials";
import ScrollToHash from "./ScrollToHash/ScrollToHash";

function Layout() {
  const { colors } = useTheme().styles;

  return (
    <>
      <ScrollToHash />
      <Section id="/" _relative="true" hero bg_color={colors.mainBg}>
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

      <Section id="games" bg_color={colors.secondaryBg}>
        <Container>
          <Games />
        </Container>
      </Section>

      <Section id="about-me" bg_color={colors.mainBg}>
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
