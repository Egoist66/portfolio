import { FC } from "react";
import data from "../../../../data/project.json";
import WorkCards from "../WorksCards/WorkCards";
import SingleProjectWrap from "./SingleProjectWrap";

import chess from "../../../../assets/project/chess.png";

const Chess: FC = () => {
  const { project } = data;
  return (
    <SingleProjectWrap>
      <WorkCards
        title={project[25].name}
        imglink={chess}
        projectLink={project[25].link}
        descr={project[25].description}
        code={{
          code_name: "Code",
          path: project[25].github,
        }}
      />
    </SingleProjectWrap>
  );
};

export default Chess;
