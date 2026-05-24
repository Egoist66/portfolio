import SingleProjectWrap from "../../MyWorks/Single/SingleProjectWrap";
import WorkCards from "../../MyWorks/WorksCards/WorkCards";
import chess from "../../../../assets/project/chess.png";
import { useGame } from "../../../../hooks/useLocalizedData";
import { useLanguage } from "../../../../context/LanguageContext";

const Chess = () => {
  const game = useGame(0);
  const { t } = useLanguage();

  return (
    <SingleProjectWrap>
      <WorkCards
        title={game.name}
        imglink={chess}
        projectLink={game.link}
        descr={game.description}
        code={{
          code_name: t("common.code"),
          path: game.github,
        }}
      />
    </SingleProjectWrap>
  );
};

export default Chess;
