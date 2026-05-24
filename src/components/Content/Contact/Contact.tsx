import SectionTitle from "../SectionTitle/SectionTitle";
import ContactForm from "./ContactForm/ContactForm";
import { useLanguage } from "../../../context/LanguageContext";

function Contact() {
  const { t } = useLanguage();

  return (
    <>
      <SectionTitle text={t("sections.contact")} />
      <ContactForm />
    </>
  );
}

export default Contact;
