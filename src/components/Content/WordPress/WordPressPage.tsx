import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import Container from "../../Container/Container";
import { useLanguage } from "../../../context/LanguageContext";
import { setLocaleInSearch } from "../../../utils/localeQuery";
import { useWordPressPlugins } from "../../../hooks/useWordPressPlugins";
import { wordpressTagLabels } from "../../../i18n/wordpress";

const Page = styled.div`
  min-height: 100svh;
  background: ${({ theme }) => theme.styles.colors.mainBg};
  position: relative;
  overflow-x: hidden;
`;

const Glow = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 0;

  &.a {
    width: min(480px, 80vw);
    height: min(480px, 80vw);
    top: -8%;
    right: -12%;
    background: ${({ theme }) => theme.styles.colors.heroGlowA};
  }

  &.b {
    width: min(360px, 60vw);
    height: min(360px, 60vw);
    bottom: 20%;
    left: -10%;
    background: ${({ theme }) => theme.styles.colors.heroGlowB};
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  padding: clamp(5rem, 12vw, 7rem) 0 clamp(3rem, 8vw, 5rem);
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.styles.colors.textMuted};
  transition: color ${({ theme }) => theme.styles.transition.base};

  &:hover {
    color: ${({ theme }) => theme.styles.colors.decorColorLight};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const HeroCard = styled.header`
  padding: clamp(1.75rem, 4vw, 2.75rem);
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  background: ${({ theme }) => theme.styles.colors.surface};
  border: 1px solid ${({ theme }) => theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.xl};
  box-shadow: ${({ theme }) => theme.styles.shadow.md};
`;

const Eyebrow = styled.span`
  display: inline-block;
  padding: 0.35rem 0.85rem;
  margin-bottom: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.styles.colors.decorColorLight};
  background: rgba(124, 108, 240, 0.12);
  border: 1px solid ${({ theme }) => theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.full};
`;

const Title = styled.h1`
  font-size: clamp(1.75rem, 4.5vw, 2.75rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.styles.colors.textColor};
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2.2vw, 1.125rem);
  line-height: 1.7;
  color: ${({ theme }) => theme.styles.colors.textMuted};
  max-width: 62ch;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.25rem, 3vw, 1.5rem);

  @media (min-width: ${({ theme }) => theme.styles.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PluginCard = styled.article`
  display: flex;
  flex-direction: column;
  padding: clamp(1.25rem, 3vw, 1.75rem);
  background: ${({ theme }) => theme.styles.colors.surface};
  border: 1px solid ${({ theme }) => theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.lg};
  box-shadow: ${({ theme }) => theme.styles.shadow.sm};
  transition: border-color ${({ theme }) => theme.styles.transition.base},
    box-shadow ${({ theme }) => theme.styles.transition.base},
    transform ${({ theme }) => theme.styles.transition.fast};

  &:hover {
    border-color: ${({ theme }) => theme.styles.colors.borderFocus};
    box-shadow: ${({ theme }) => theme.styles.shadow.md};
    transform: translateY(-2px);
  }
`;

const PluginHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.875rem;
`;

const PluginName = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.styles.colors.textColor};
  margin-bottom: 0.25rem;
`;

const PluginSlug = styled.p`
  font-size: 0.75rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  color: ${({ theme }) => theme.styles.colors.textMuted};
`;

const VersionBadge = styled.span`
  flex-shrink: 0;
  padding: 0.3rem 0.65rem;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.styles.colors.decorColorLight};
  background: rgba(124, 108, 240, 0.12);
  border: 1px solid ${({ theme }) => theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.full};
`;

const Description = styled.p`
  font-size: 0.9375rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.styles.colors.textMuted};
  margin-bottom: 1rem;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  padding: 0.3rem 0.65rem;
  font-size: 0.6875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.styles.colors.textColor};
  background: ${({ theme }) => theme.styles.colors.mainBg};
  border: 1px solid ${({ theme }) => theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.full};
`;

const FeatureList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin-bottom: 1.25rem;
  padding-left: 0;
`;

const FeatureItem = styled.li`
  position: relative;
  padding-left: 1rem;
  font-size: 0.8125rem;
  line-height: 1.55;
  color: ${({ theme }) => theme.styles.colors.textMuted};

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${({ theme }) => theme.styles.colors.decorColor};
  }
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  margin-bottom: 1.25rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.styles.colors.textMuted};
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin-top: auto;
`;

const DownloadLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.15rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  background: ${({ theme }) => theme.styles.colors.accentGradient};
  border-radius: ${({ theme }) => theme.styles.radius.full};
  box-shadow: ${({ theme }) => theme.styles.shadow.glow};
  transition: transform ${({ theme }) => theme.styles.transition.fast},
    box-shadow ${({ theme }) => theme.styles.transition.base};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.styles.shadow.lg};
  }
`;

const EmptyState = styled.p`
  padding: 2rem;
  text-align: center;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.styles.colors.textMuted};
  background: ${({ theme }) => theme.styles.colors.surface};
  border: 1px solid ${({ theme }) => theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.lg};
`;

function WordPressPage() {
  const plugins = useWordPressPlugins();
  const { t, locale } = useLanguage();
  const location = useLocation();
  const localizedSearch = setLocaleInSearch(location.search, locale);
  const homeTo = { pathname: "/", search: localizedSearch };
  const tagLabels = wordpressTagLabels[locale];

  return (
    <Page>
      <Glow className="a" aria-hidden />
      <Glow className="b" aria-hidden />
      <Content>
        <Container>
          <BackLink to={homeTo}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {t("wordpress.back")}
          </BackLink>

          <HeroCard>
            <Eyebrow>{t("wordpress.eyebrow")}</Eyebrow>
            <Title>{t("wordpress.title")}</Title>
            <Subtitle>{t("wordpress.subtitle")}</Subtitle>
          </HeroCard>

          {plugins.length === 0 ? (
            <EmptyState>{t("wordpress.empty")}</EmptyState>
          ) : (
            <Grid>
              {plugins.map((plugin) => (
                <PluginCard key={plugin.slug}>
                  <PluginHeader>
                    <div>
                      <PluginName>{plugin.name}</PluginName>
                      <PluginSlug>{plugin.slug}</PluginSlug>
                    </div>
                    <VersionBadge>v{plugin.version}</VersionBadge>
                  </PluginHeader>

                  <Description>{plugin.description}</Description>

                  <TagRow>
                    {plugin.tags.map((tag) => (
                      <Tag key={tag}>{tagLabels[tag] ?? tag}</Tag>
                    ))}
                  </TagRow>

                  <FeatureList>
                    {plugin.features.map((feature) => (
                      <FeatureItem key={feature}>{feature}</FeatureItem>
                    ))}
                  </FeatureList>

                  <MetaRow>
                    <span>{t("wordpress.wpMin")}: {plugin.wpMin}+</span>
                    <span>{t("wordpress.phpMin")}: {plugin.phpMin}+</span>
                    <span>{t("wordpress.updated")}: {plugin.updatedAt}</span>
                  </MetaRow>

                  <Actions>
                    <DownloadLink href={plugin.downloadUrl} download>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                      </svg>
                      {t("wordpress.download")}
                    </DownloadLink>
                  </Actions>
                </PluginCard>
              ))}
            </Grid>
          )}
        </Container>
      </Content>
    </Page>
  );
}

export default WordPressPage;
