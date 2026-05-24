import projectData from "../data/project.json";
import gamesData from "../data/games.json";
import { projectTranslations } from "../i18n/projects";
import { useLanguage } from "../context/LanguageContext";

export function useProjects() {
  const { locale } = useLanguage();

  return projectData.project.map((item, index) => ({
    ...item,
    name: projectTranslations[locale][index]?.name ?? item.name,
    description:
      projectTranslations[locale][index]?.description ?? item.description,
  }));
}

export function useProject(index: number) {
  const projects = useProjects();
  return projects[index];
}

export function useGames() {
  const { locale } = useLanguage();

  return gamesData.games.map((item, index) => {
    if (index === 0 && locale === "ru") {
      return {
        ...item,
        name: "Шахматы",
        description:
          "Полноценные шахматы в браузере: история ходов, отмена, сохранение, звук и взятые фигуры",
      };
    }
    return item;
  });
}

export function useGame(index: number) {
  const games = useGames();
  return games[index];
}
