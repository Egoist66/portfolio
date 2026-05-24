import GameLinks from "../../Router/GameLinks";
import SectionTitle from "../SectionTitle/SectionTitle";
import GamesWrapper from "./GamesWrapper/GamesWrapper";
import { useLanguage } from "../../../context/LanguageContext";

function Games() {
  const { t } = useLanguage();

  return (
    <>
      <SectionTitle text={t("sections.games")} />
      <GameLinks />
      <GamesWrapper />
    </>
  );
}

export default Games;
