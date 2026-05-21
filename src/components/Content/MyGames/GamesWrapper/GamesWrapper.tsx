import styled from "styled-components";
import GameRoutes from "../../../Router/GameRoutes";

const StyledGamesWrapper = styled.div`
  width: 100%;
`;

function GamesWrapper() {
  return (
    <StyledGamesWrapper>
      <GameRoutes />
    </StyledGamesWrapper>
  );
}

export default GamesWrapper;
