import { Route, Routes } from "react-router-dom";
import Text from "../../service/TEXT/TEXT";
import { lazy, Suspense } from "react";
import styled from "styled-components";
import { WORK_CARD_WIDTH } from "../Content/MyWorks/WorksCards/WorkCards";

const GamesFallbackWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: clamp(360px, 55vw, 520px);
`;

const GamesFallbackCard = styled.div`
  width: ${WORK_CARD_WIDTH}px;
  max-width: 100%;
  min-height: clamp(320px, 48vw, 480px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.styles.radius.lg};
  border: 1px dashed ${({ theme }) => theme.styles.colors.border};
  background: ${({ theme }) => theme.styles.colors.surface};
`;

const _AllGames = lazy(() => import("../Content/MyGames/All/AllGames"));
const _Chess = lazy(() => import("../Content/MyGames/Single/Chess"));

function GamesLoadingFallback() {
  return (
    <GamesFallbackWrap>
      <GamesFallbackCard>
        <Text centered="true" type="h2">
          Loading...
        </Text>
      </GamesFallbackCard>
    </GamesFallbackWrap>
  );
}

function GameRoutes() {
  return (
    <Suspense fallback={<GamesLoadingFallback />}>
      <Routes>
        <Route path="/games" element={<_AllGames />} />
        <Route path="/games/chess" element={<_Chess />} />
        <Route path="/games/*" element={<_AllGames />} />
      </Routes>
    </Suspense>
  );
}

export default GameRoutes;
