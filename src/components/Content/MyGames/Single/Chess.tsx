import { FC } from "react";
import data from "../../../../data/games.json";
import WorkCards from "../../MyWorks/WorksCards/WorkCards";
import SingleProjectWrap from "../../MyWorks/Single/SingleProjectWrap";

import chess from "../../../../assets/project/chess.png";

const Chess: FC = () => {
  const { games } = data;
  return (
    <SingleProjectWrap>
      <WorkCards
        title={games[0].name}
        imglink={chess}
        projectLink={games[0].link}
        descr={games[0].description}
        code={{
          code_name: "Code",
          path: games[0].github,
        }}
      />
    </SingleProjectWrap>
  );
};

export default Chess;
