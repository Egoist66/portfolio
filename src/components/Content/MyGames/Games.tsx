import styled from "styled-components";
import GameLinks from "../../Router/GameLinks";
import SectionTitle from "../SectionTitle/SectionTitle";
import GamesWrapper from "./GamesWrapper/GamesWrapper";

const SectionIntro = styled.p`
  text-align: center;
  max-width: 34rem;
  margin: -1.25rem auto 2.5rem;
  color: ${({ theme }) => theme.styles.colors.textMuted};
  font-size: clamp(0.9375rem, 2vw, 1.0625rem);
  line-height: 1.65;
`;

function Games() {
  return (
    <>
      <SectionTitle text="My games" />
      <SectionIntro>
        Interactive browser games built for fun, logic practice, and polished
        front-end experiments.
      </SectionIntro>
      <GameLinks />
      <GamesWrapper />
    </>
  );
}

export default Games;
