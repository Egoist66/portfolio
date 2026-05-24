import WorkLinks from "../../Router/WorkLinks";
import SectionTitle from "../SectionTitle/SectionTitle";
import WorksWrapper from "./WorksWrapper/WorksWrapper";
import { useLanguage } from "../../../context/LanguageContext";

function Works() {
  const { t } = useLanguage();

  return (
    <>
      <SectionTitle text={t("sections.works")} />
      <WorkLinks />
      <WorksWrapper />
    </>
  );
}

export default Works;
