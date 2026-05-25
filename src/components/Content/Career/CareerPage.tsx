import styled from "styled-components";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "../../Container/Container";
import useResumeData from "../../../hooks/useResumeData";
import { useLanguage } from "../../../context/LanguageContext";
import { setLocaleInSearch } from "../../../utils/localeQuery";
import type { ResumePdfLabels } from "../../../utils/generateResumePdf";
import { hasBelarusRussiaWorkPermit } from "../../../utils/resumeRegion";

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

const Name = styled.h1`
  font-size: clamp(1.75rem, 4.5vw, 2.75rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.styles.colors.textColor};
`;

const Title = styled.p`
  font-size: clamp(1.125rem, 2.5vw, 1.375rem);
  font-weight: 500;
  color: ${({ theme }) => theme.styles.colors.decorColorLight};
  margin-bottom: 1.25rem;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.styles.colors.textMuted};
`;

const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
`;

const ContactGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin-bottom: 1.5rem;
`;

const ContactChip = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.styles.colors.textColor};
  background: ${({ theme }) => theme.styles.colors.mainBg};
  border: 1px solid ${({ theme }) => theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.full};
  transition: border-color ${({ theme }) => theme.styles.transition.base},
    box-shadow ${({ theme }) => theme.styles.transition.base},
    transform ${({ theme }) => theme.styles.transition.fast};

  &:hover {
    border-color: ${({ theme }) => theme.styles.colors.borderFocus};
    box-shadow: ${({ theme }) => theme.styles.shadow.glow};
    transform: translateY(-1px);
  }
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
`;

const DownloadBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  background: ${({ theme }) => theme.styles.colors.accentGradient};
  border: none;
  border-radius: ${({ theme }) => theme.styles.radius.full};
  box-shadow: ${({ theme }) => theme.styles.shadow.glow};
  cursor: pointer;
  transition: transform ${({ theme }) => theme.styles.transition.fast},
    box-shadow ${({ theme }) => theme.styles.transition.base},
    opacity ${({ theme }) => theme.styles.transition.base};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.styles.shadow.lg};
  }

  &:disabled {
    opacity: 0.7;
    cursor: wait;
  }
`;

const LocalPdfLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.styles.colors.textColor};
  background: ${({ theme }) => theme.styles.colors.mainBg};
  border: 1px solid ${({ theme }) => theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.full};
  transition: transform ${({ theme }) => theme.styles.transition.fast},
    border-color ${({ theme }) => theme.styles.transition.base},
    box-shadow ${({ theme }) => theme.styles.transition.base};

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.styles.colors.borderFocus};
    box-shadow: ${({ theme }) => theme.styles.shadow.sm};
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.5rem, 4vw, 2rem);

  @media (min-width: ${({ theme }) => theme.styles.breakpoints.lg}) {
    grid-template-columns: 320px 1fr;
    align-items: start;
  }
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: clamp(1.25rem, 3vw, 1.5rem);
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: clamp(1.25rem, 3vw, 1.5rem);
`;

const Card = styled.section`
  padding: clamp(1.25rem, 3vw, 1.75rem);
  background: ${({ theme }) => theme.styles.colors.surface};
  border: 1px solid ${({ theme }) => theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.lg};
  box-shadow: ${({ theme }) => theme.styles.shadow.sm};
`;

const CardTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 1.0625rem;
  font-weight: 600;
  margin-bottom: 1.125rem;
  color: ${({ theme }) => theme.styles.colors.textColor};

  &::before {
    content: "";
    width: 4px;
    height: 1.125rem;
    border-radius: 2px;
    background: ${({ theme }) => theme.styles.colors.accentGradient};
  }
`;

const AboutText = styled.p`
  font-size: 0.9375rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.styles.colors.textMuted};
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillTag = styled.span`
  padding: 0.35rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.styles.colors.textColor};
  background: ${({ theme }) => theme.styles.colors.mainBg};
  border: 1px solid ${({ theme }) => theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.full};
  transition: border-color ${({ theme }) => theme.styles.transition.base};

  &:hover {
    border-color: ${({ theme }) => theme.styles.colors.borderFocus};
  }
`;

const LangList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const LangItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  font-size: 0.875rem;
`;

const LangName = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.styles.colors.textColor};
`;

const LangLevel = styled.span`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.styles.colors.textMuted};
  text-align: right;
`;

const InfoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.styles.colors.textMuted};
`;

const InfoItem = styled.li`
  line-height: 1.5;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const ExpCard = styled.article`
  position: relative;
  padding: clamp(1.25rem, 3vw, 1.75rem);
  padding-left: clamp(1.5rem, 3vw, 2rem);
  background: ${({ theme }) => theme.styles.colors.surface};
  border: 1px solid ${({ theme }) => theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.lg};
  box-shadow: ${({ theme }) => theme.styles.shadow.sm};
  transition: border-color ${({ theme }) => theme.styles.transition.base},
    box-shadow ${({ theme }) => theme.styles.transition.base};

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 1.5rem;
    bottom: 1.5rem;
    width: 3px;
    border-radius: 0 2px 2px 0;
    background: ${({ theme }) => theme.styles.colors.accentGradient};
  }

  &:hover {
    border-color: ${({ theme }) => theme.styles.colors.borderFocus};
    box-shadow: ${({ theme }) => theme.styles.shadow.md};
  }
`;

const ExpHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem 1.5rem;
  margin-bottom: 0.75rem;
`;

const ExpRole = styled.h3`
  font-size: 1.0625rem;
  font-weight: 600;
  color: ${({ theme }) => theme.styles.colors.textColor};
  margin-bottom: 0.25rem;
`;

const ExpCompany = styled.p`
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${({ theme }) => theme.styles.colors.decorColorLight};
`;

const ExpPeriod = styled.div`
  text-align: right;
  flex-shrink: 0;
`;

const ExpDate = styled.span`
  display: block;
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.styles.colors.textColor};
`;

const ExpDuration = styled.span`
  display: block;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.styles.colors.textMuted};
  margin-top: 0.15rem;
`;

const ExpIndustry = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.styles.colors.textMuted};
  margin-bottom: 0.875rem;
`;

const ExpDescription = styled.p`
  font-size: 0.875rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.styles.colors.textMuted};
  margin-bottom: 1rem;
`;

const ExpHighlights = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-left: 0;
`;

const ExpHighlight = styled.li`
  position: relative;
  padding-left: 1.125rem;
  font-size: 0.8125rem;
  line-height: 1.6;
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

const ExpStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
`;

const StackTag = styled.span`
  padding: 0.25rem 0.625rem;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.styles.colors.decorColorLight};
  background: rgba(124, 108, 240, 0.1);
  border-radius: ${({ theme }) => theme.styles.radius.sm};
`;

const EduList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EduItem = styled.li`
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.styles.colors.border};

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const EduYear = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.styles.colors.decorColorLight};
  margin-bottom: 0.35rem;
`;

const EduTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.styles.colors.textColor};
  margin-bottom: 0.15rem;
`;

const EduProvider = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.styles.colors.textMuted};
`;

const StateCard = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 3rem);
  text-align: center;
  background: ${({ theme }) => theme.styles.colors.surface};
  border: 1px solid ${({ theme }) => theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.xl};
  box-shadow: ${({ theme }) => theme.styles.shadow.md};
`;

const StateTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.styles.colors.textColor};
`;

const StateText = styled.p`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.styles.colors.textMuted};
`;

const UpdatedAt = styled.p`
  margin-top: 1rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.styles.colors.textMuted};
`;

function CareerPage() {
  const { data, loading, error } = useResumeData();
  const { t, locale } = useLanguage();
  const location = useLocation();
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const localizedSearch = setLocaleInSearch(location.search, locale);
  const homeTo = { pathname: "/", search: localizedSearch };

  const handleGeneratePdf = async () => {
    if (!data || generatingPdf) return;

    const labels: ResumePdfLabels = {
      experience: t("career.experience"),
      skills: t("career.skills"),
      languages: t("career.languages"),
      education: t("career.education"),
      courses: t("career.courses"),
      additional: t("career.additional"),
      about: t("career.about"),
      workExperience: t("career.workExperience"),
      citizenship: t("career.citizenship"),
      workPermit: t("career.workPermit"),
      format: t("career.format"),
      employment: t("career.employment"),
      ownCar: t("career.ownCar"),
      recommendations: t("career.recommendations"),
      portfolio: t("career.portfolio"),
      updated: t("career.updated"),
    };

    try {
      setGeneratingPdf(true);
      const { generateResumePdf } = await import("../../../utils/generateResumePdf");
      await generateResumePdf(data, labels, locale);
    } catch {
      window.alert(t("career.generatePdfError"));
    } finally {
      setGeneratingPdf(false);
    }
  };

  if (loading) {
    return (
      <Page>
        <Glow className="a" aria-hidden />
        <Glow className="b" aria-hidden />
        <Content>
          <Container>
            <StateCard>
              <StateTitle>{t("career.loadingTitle")}</StateTitle>
              <StateText>{t("career.loadingText")}</StateText>
            </StateCard>
          </Container>
        </Content>
      </Page>
    );
  }

  if (error || !data) {
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
              {t("career.back")}
            </BackLink>
            <StateCard>
              <StateTitle>{t("career.errorTitle")}</StateTitle>
              <StateText>{error ?? t("career.errorFallback")}</StateText>
            </StateCard>
          </Container>
        </Content>
      </Page>
    );
  }

  const { meta, personal, about, experience, education, courses, skills, languages, driving, recommendations } = data;
  const showLocalPdf = hasBelarusRussiaWorkPermit(personal.workPermit);

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
            {t("career.back")}
          </BackLink>

          <HeroCard>
            <Eyebrow>{t("career.eyebrow")}</Eyebrow>
            <Name>{personal.name}</Name>
            <Title>{personal.title}</Title>

            <MetaRow>
              <MetaItem>{personal.location}</MetaItem>
              <MetaItem>{t("career.experience")}: {personal.totalExperience}</MetaItem>
              <MetaItem>{personal.relocation}</MetaItem>
            </MetaRow>

            <ContactGrid>
              <ContactChip href={`tel:${personal.contacts.phone.replace(/\s/g, "")}`}>
                {personal.contacts.phone}
              </ContactChip>
              <ContactChip href={`mailto:${personal.contacts.email}`}>
                {personal.contacts.email}
              </ContactChip>
              <ContactChip href={personal.contacts.telegramUrl} target="_blank" rel="noopener noreferrer">
                {personal.contacts.telegram}
              </ContactChip>
              <ContactChip href={personal.contacts.portfolio} target="_blank" rel="noopener noreferrer">
                {t("career.portfolio")}
              </ContactChip>
            </ContactGrid>

            <ActionRow>
              <DownloadBtn
                type="button"
                onClick={handleGeneratePdf}
                disabled={generatingPdf}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                {generatingPdf ? t("career.generatingPdf") : t("career.downloadPdf")}
              </DownloadBtn>

              {showLocalPdf && (
                <LocalPdfLink
                  href={personal.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  {t("career.downloadLocalPdf")}
                </LocalPdfLink>
              )}
            </ActionRow>
            {meta.updatedAt && (
              <UpdatedAt>{t("career.updated")}: {meta.updatedAt}</UpdatedAt>
            )}
          </HeroCard>

          <Layout>
            <Sidebar>
              <Card>
                <CardTitle>{t("career.skills")}</CardTitle>
                <SkillTags>
                  {skills.map((skill) => (
                    <SkillTag key={skill}>{skill}</SkillTag>
                  ))}
                </SkillTags>
              </Card>

              <Card>
                <CardTitle>{t("career.languages")}</CardTitle>
                <LangList>
                  {languages.map((lang) => (
                    <LangItem key={lang.name}>
                      <LangName>{lang.name}</LangName>
                      <LangLevel>{lang.level}</LangLevel>
                    </LangItem>
                  ))}
                </LangList>
              </Card>

              <Card>
                <CardTitle>{t("career.education")}</CardTitle>
                <EduList>
                  {education.map((edu) => (
                    <EduItem key={edu.institution}>
                      <EduYear>{edu.year} · {edu.type}</EduYear>
                      <EduTitle>{edu.degree}</EduTitle>
                      <EduProvider>{edu.institution}</EduProvider>
                    </EduItem>
                  ))}
                </EduList>
              </Card>

              <Card>
                <CardTitle>{t("career.courses")}</CardTitle>
                <EduList>
                  {courses.map((course) => (
                    <EduItem key={`${course.year}-${course.title}`}>
                      <EduYear>{course.year}</EduYear>
                      <EduTitle>{course.title}</EduTitle>
                      <EduProvider>{course.provider}</EduProvider>
                    </EduItem>
                  ))}
                </EduList>
              </Card>

              <Card>
                <CardTitle>{t("career.additional")}</CardTitle>
                <InfoList>
                  <InfoItem>
                    {t("career.citizenship")}: {personal.citizenship}. {t("career.workPermit")}: {personal.workPermit.join(", ")}
                  </InfoItem>
                  <InfoItem>
                    {t("career.format")}: {personal.workFormats.join(", ")}
                  </InfoItem>
                  <InfoItem>
                    {t("career.employment")}: {personal.employmentTypes.join(", ")}
                  </InfoItem>
                  {driving.hasCar && (
                    <InfoItem>
                      {driving.license}. {t("career.ownCar")}
                    </InfoItem>
                  )}
                  <InfoItem>
                    {t("career.recommendations")}: {recommendations.company} — {recommendations.contact}
                  </InfoItem>
                </InfoList>
              </Card>
            </Sidebar>

            <Main>
              <Card>
                <CardTitle>{t("career.about")}</CardTitle>
                <AboutText>{about}</AboutText>
              </Card>

              <Card as="div">
                <CardTitle>{t("career.workExperience")}</CardTitle>
                <Timeline>
                  {experience.map((job) => (
                    <ExpCard key={`${job.company}-${job.period}`}>
                      <ExpHeader>
                        <div>
                          <ExpRole>{job.role}</ExpRole>
                          <ExpCompany>
                            {job.company}
                            {job.website && (
                              <> · <a href={job.website} target="_blank" rel="noopener noreferrer">{job.website.replace(/^https?:\/\//, "")}</a></>
                            )}
                          </ExpCompany>
                        </div>
                        <ExpPeriod>
                          <ExpDate>{job.period}</ExpDate>
                          <ExpDuration>{job.duration}</ExpDuration>
                        </ExpPeriod>
                      </ExpHeader>

                      <ExpIndustry>{job.industry} · {job.location}</ExpIndustry>
                      <ExpDescription>{job.description}</ExpDescription>

                      {job.highlights.length > 0 && (
                        <ExpHighlights>
                          {job.highlights.map((item, index) => (
                            <ExpHighlight key={typeof item === "string" ? item : index}>
                              {typeof item === "string" ? item : String(item)}
                            </ExpHighlight>
                          ))}
                        </ExpHighlights>
                      )}

                      <ExpStack>
                        {job.stack.map((tech) => (
                          <StackTag key={tech}>{tech}</StackTag>
                        ))}
                      </ExpStack>
                    </ExpCard>
                  ))}
                </Timeline>
              </Card>
            </Main>
          </Layout>
        </Container>
      </Content>
    </Page>
  );
}

export default CareerPage;
