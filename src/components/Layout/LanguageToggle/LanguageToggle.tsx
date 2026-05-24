import styled from "styled-components";
import { useLanguage } from "../../../context/LanguageContext";

const ToggleButton = styled.button<{ $active?: boolean }>`
  min-width: 48px;
  height: 48px;
  padding: 0 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.styles.colors.borderFocus : theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.md};
  background: ${({ theme, $active }) =>
    $active ? theme.styles.colors.surfaceHover : theme.styles.colors.surface};
  color: ${({ theme, $active }) =>
    $active ? theme.styles.colors.decorColorLight : theme.styles.colors.textColor};
  box-shadow: ${({ theme }) => theme.styles.shadow.sm};
  transition: background ${({ theme }) => theme.styles.transition.base},
    border-color ${({ theme }) => theme.styles.transition.base},
    transform ${({ theme }) => theme.styles.transition.fast},
    color ${({ theme }) => theme.styles.transition.base};

  &:hover {
    background: ${({ theme }) => theme.styles.colors.surfaceHover};
    border-color: ${({ theme }) => theme.styles.colors.borderFocus};
    color: ${({ theme }) => theme.styles.colors.decorColorLight};
    transform: scale(1.04);
  }
`;

const Divider = styled.span`
  opacity: 0.35;
  font-weight: 400;
`;

function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <ToggleButton
      type="button"
      onClick={() => setLocale(locale === "en" ? "ru" : "en")}
      aria-label={t("lang.switchTo")}
      title={t("lang.switchTo")}
    >
      <span style={{ opacity: locale === "en" ? 1 : 0.45 }}>{t("lang.en")}</span>
      <Divider>/</Divider>
      <span style={{ opacity: locale === "ru" ? 1 : 0.45 }}>{t("lang.ru")}</span>
    </ToggleButton>
  );
}

export default LanguageToggle;
