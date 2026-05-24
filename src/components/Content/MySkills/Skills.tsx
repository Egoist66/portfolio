import SectionTitle from "../SectionTitle/SectionTitle";
import SkillsCards from "./SkillsCards/SkillsCards";
import { useLanguage } from "../../../context/LanguageContext";

function Skills() {
  const { t } = useLanguage();

  return (
    <>
      <SectionTitle text={t("sections.skills")} />
      <SkillsCards />
    </>
  );
}

export default Skills;
