import SectionTitle from "../SectionTitle/SectionTitle";
import TestimonyWrapper from "./TestimonyWrapper/TestimonyWrapper";
import { useLanguage } from "../../../context/LanguageContext";

function Testimony() {
  const { t } = useLanguage();

  return (
    <>
      <SectionTitle text={t("sections.about")} />
      <TestimonyWrapper />
    </>
  );
}

export default Testimony;
