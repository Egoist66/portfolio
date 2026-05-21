import WorkCards, { WORK_CARD_WIDTH } from "../../MyWorks/WorksCards/WorkCards";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import "swiper/css/bundle";
import {
  A11y,
  Autoplay,
  Keyboard,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper";

import data from "../../../../data/games.json";
import chess from "../../../../assets/project/chess.png";
import { memo } from "react";

const GameSlide = styled(SwiperSlide)`
  width: ${WORK_CARD_WIDTH}px;
  max-width: 100%;
  height: auto;
  box-sizing: border-box;
`;

const gameIcons = [chess];

function AllGames() {
  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={32}
      speed={600}
      autoplay={{ delay: 4500, disableOnInteraction: false }}
      loop={data.games.length > 1}
      keyboard
      modules={[Navigation, Keyboard, Pagination, Scrollbar, A11y, Autoplay]}
    >
      {data.games.map((game, i) => (
        <GameSlide key={game.name}>
          <WorkCards
            imglink={gameIcons[i]}
            title={game.name}
            projectLink={game.link}
            descr={game.description}
            code={{
              path: game.github,
              code_name: "Code",
            }}
          />
        </GameSlide>
      ))}
    </Swiper>
  );
}

export default memo(AllGames);
