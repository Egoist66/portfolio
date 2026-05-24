import { FC, ReactNode } from "react";
import { useProject } from "../../../../hooks/useLocalizedData";
import { useLanguage } from "../../../../context/LanguageContext";
import WorkCards from "../WorksCards/WorkCards";
import SingleProjectWrap from "./SingleProjectWrap";

type ProjectCardPageProps = {
  index: number;
  img: string;
  children?: ReactNode;
};

const ProjectCardPage: FC<ProjectCardPageProps> = ({ index, img }) => {
  const project = useProject(index);
  const { t } = useLanguage();

  return (
    <SingleProjectWrap>
      <WorkCards
        title={project.name}
        imglink={img}
        projectLink={project.link}
        descr={project.description}
        code={{
          code_name: t("common.code"),
          path: project.github,
        }}
      />
    </SingleProjectWrap>
  );
};

export default ProjectCardPage;
