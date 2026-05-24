import SectionTitle from "../SectionTitle/SectionTitle";
import styled from "styled-components";
import Text from "../../../service/TEXT/TEXT";
import { useLanguage } from "../../../context/LanguageContext";

import telegram from "../../../assets/socials/tgsvg.svg";
import inst from "../../../assets/socials/social icon.svg";
import vk from "../../../assets/socials/social icon (1).svg";
import linked from "../../../assets/socials/social icon (2).svg";

const socialIcons: Array<string> = [telegram, inst, vk, linked];

const links: Array<string> = [
  "https://t.me/codebuilder1",
  "https://www.instagram.com/eg0ist66/",
  "https://vk.com/metalmaniac_666",
  "https://www.linkedin.com/in/farid-mahmudov-1624a8227",
];

const StyledSocialNav = styled.nav`
  margin-bottom: 2rem;
`;

const StyledSocialList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  padding: 0.75rem;
  background: ${({ theme }) => theme.styles.colors.surface};
  border: 1px solid ${({ theme }) => theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.md};
  transition: transform ${({ theme }) => theme.styles.transition.base},
    border-color ${({ theme }) => theme.styles.transition.base},
    box-shadow ${({ theme }) => theme.styles.transition.base};

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    opacity: 0.85;
    transition: opacity ${({ theme }) => theme.styles.transition.fast};
  }

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ theme }) => theme.styles.colors.borderFocus};
    box-shadow: ${({ theme }) => theme.styles.shadow.glow};

    img {
      opacity: 1;
    }
  }
`;

const Copyright = styled(Text)`
  opacity: 0.7;
`;

function Socials() {
  const { t } = useLanguage();

  return (
    <>
      <SectionTitle font_size="clamp(1.25rem, 3vw, 1.5rem)" text={t("sections.social")} />

      <StyledSocialNav>
        <StyledSocialList>
          {socialIcons.map((social, i) => (
            <li key={social}>
              <SocialLink
                target="_blank"
                rel="noopener noreferrer"
                href={links[i]}
                aria-label={`${t("social.link")} ${i + 1}`}
              >
                <img src={social} alt="" />
              </SocialLink>
            </li>
          ))}
        </StyledSocialList>
      </StyledSocialNav>

      <Copyright centered="true" font_size="0.875rem">
        © {new Date().getFullYear()} Farid Makhmudov. {t("social.copyright")}
      </Copyright>
    </>
  );
}

export default Socials;
