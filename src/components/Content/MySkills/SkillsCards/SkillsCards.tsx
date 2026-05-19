import styled from "styled-components";
import skills from "../../../../data/skills.json";
import Text from "../../../../service/TEXT/TEXT";

import css3 from "../../../../assets/images-2/css.png";
import bs from "../../../../assets/images-2/bs.png";
import git from "../../../../assets/images-2/git.png";
import html from "../../../../assets/images-2/html.png";
import js from "../../../../assets/images-2/js.png";
import jq from "../../../../assets/images-2/jquery.png";
import native from "../../../../assets/images-2/native.webp";
import react from "../../../../assets/images-2/react.png";
import reduxicon from "../../../../assets/images-2/redux.png";
import saga from "../../../../assets/images-2/redux-saga.svg";
import query from "../../../../assets/images-2/react-q.png";
import sass from "../../../../assets/images-2/sass.png";
import styledicon from "../../../../assets/images-2/styled.png";
import ts from "../../../../assets/images-2/ts.png";
import tailwind from "../../../../assets/images-2/tailwind.png";
import fire from "../../../../assets/images-2/fire.png";
import ant from "../../../../assets/images-2/ant.png";
import story from "../../../../assets/images-2/story.png";
import jest from "../../../../assets/images-2/jest.webp";
import php from "../../../../assets/images-2/php.png";
import alpine from "../../../../assets/images-2/alpine.png";
import vue from "../../../../assets/images-2/vue.png";
import nuxt from "../../../../assets/images-2/nuxt.svg";
import pinia from "../../../../assets/images-2/pinia.svg";
import nodejs from "../../../../assets/images-2/nodejs-image.webp";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import {
  A11y,
  Autoplay,
  Keyboard,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper";

const _skillsImages: Array<string> = [
  html,
  css3,
  sass,
  bs,
  tailwind,
  git,
  js,
  jq,
  ts,
  react,
  native,
  reduxicon,
  saga,
  query,
  styledicon,
  ant,
  fire,
  jest,
  story,
  php,
  alpine,
  vue,
  nuxt,
  pinia,
  nodejs,
];

const SkillsGrid = styled.div`
  margin: 0 -0.5rem;
`;

export const SkillsFigure = styled.div`
  width: 72px;
  height: 72px;
  margin: 0 auto 1.25rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.styles.colors.surface};
  border: 1px solid ${({ theme }) => theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.lg};
  box-shadow: ${({ theme }) => theme.styles.shadow.sm};
  transition: transform ${({ theme }) => theme.styles.transition.base},
    box-shadow ${({ theme }) => theme.styles.transition.base},
    border-color ${({ theme }) => theme.styles.transition.base};

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const SkillCard = styled.div`
  text-align: center;
  padding: 1.5rem 1rem 2rem;
  border-radius: ${({ theme }) => theme.styles.radius.lg};
  background: transparent;
  transition: background ${({ theme }) => theme.styles.transition.base};

  &:hover ${SkillsFigure} {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.styles.colors.borderFocus};
    box-shadow: ${({ theme }) => theme.styles.shadow.md},
      ${({ theme }) => theme.styles.shadow.glow};
  }

  h2 {
    font-size: 0.8125rem !important;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.styles.colors.textMuted};
  }
`;

function SkillsCards(): JSX.Element {
  return (
    <SkillsGrid id="skills-grid">
      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        speed={500}
        loop
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        keyboard
        breakpoints={{
          480: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 24 },
          1024: { slidesPerView: 4, spaceBetween: 28 },
        }}
        modules={[
          Navigation,
          Keyboard,
          Pagination,
          Scrollbar,
          A11y,
          Autoplay,
        ]}
      >
        {skills.map((skill, i) => (
          <SwiperSlide key={skill.title}>
            <SkillCard className="skills-cards">
              <SkillsFigure>
                <img alt={skill.title} src={_skillsImages[i]} />
              </SkillsFigure>
              <Text centered="true" type="h2">
                {skill.title}
              </Text>
            </SkillCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </SkillsGrid>
  );
}

export default SkillsCards;
