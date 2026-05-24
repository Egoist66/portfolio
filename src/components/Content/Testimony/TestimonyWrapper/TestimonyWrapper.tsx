import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import quotte from "../../../../assets/icons/quote-alt-right-svg 1.svg";
import Text from "../../../../service/TEXT/TEXT";
import { useLanguage } from "../../../../context/LanguageContext";
import { setLocaleInSearch } from "../../../../utils/localeQuery";

const QuoteCard = styled.blockquote`
  max-width: 680px;
  margin: 0 auto;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  text-align: center;
  background: ${({ theme }) => theme.styles.colors.surface};
  border: 1px solid ${({ theme }) => theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.xl};
  box-shadow: ${({ theme }) => theme.styles.shadow.md};
`;

const QuoteIcon = styled.div`
  width: 56px;
  height: 56px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(124, 108, 240, 0.12);
  border-radius: ${({ theme }) => theme.styles.radius.lg};

  img {
    width: 28px;
    height: 28px;
    opacity: 0.9;
  }
`;

const CvLink = styled(Link)`
  color: ${({ theme }) => theme.styles.colors.decorColorLight};
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color ${({ theme }) => theme.styles.transition.fast};

  &:hover {
    color: #c4b5fd;
  }
`;

function TestimonyWrapper() {
  const { t, locale } = useLanguage();
  const location = useLocation();
  const localizedSearch = setLocaleInSearch(location.search, locale);

  return (
    <QuoteCard>
      <QuoteIcon>
        <img src={quotte} alt="" />
      </QuoteIcon>

      <Text margin_auto="true" centered="true" font_size="1.0625rem">
        {t("about.text")}{" "}
        <CvLink to={{ pathname: "/career", search: localizedSearch }}>{t("about.cvLink")}</CvLink>
      </Text>
    </QuoteCard>
  );
}

export default TestimonyWrapper;
