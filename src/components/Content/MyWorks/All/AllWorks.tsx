import WorkCards, { WORK_CARD_WIDTH } from "../WorksCards/WorkCards";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import "swiper/css/bundle";
import {
  A11y,
  Autoplay,
  Keyboard,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper";

import data from "../../../../data/project.json";
import marvel from "../../../../assets/project/marvel.png";
import notes from "../../../../assets/project/notes.png";
import pencil from "../../../../assets/project/codepencil.png";
import editor from "../../../../assets/project/editor.png";
import convert from "../../../../assets/project/convert.png";
import todolist from "../../../../assets/images-2/todo.png";
import terminal from "../../../../assets/images-2/terminal.png";
import signature from "../../../../assets/project/signature.png";
import generator from "../../../../assets/project/generator.png";
import admin from "../../../../assets/project/admin.png";
import colors from "../../../../assets/project/colors.png";
import keynote from "../../../../assets/project/keynotes.png";
import crm from "../../../../assets/project/integrationcrm.png";
import password from "../../../../assets/project/password.png";
import weather from "../../../../assets/project/weather.png";
import tres from "../../../../assets/project/tres.png";
import notesv2 from "../../../../assets/project/notes-v2.png";
import interview from "../../../../assets/project/interview.png";
import lang from "../../../../assets/project/lang.png";
import { memo } from "react";

const WorkSlide = styled(SwiperSlide)`
  width: ${WORK_CARD_WIDTH}px;
  max-width: 100%;
  height: auto;
  box-sizing: border-box;
`;

const projectIcons = [
  marvel,
  notes,
  pencil,
  editor,
  convert,
  todolist,
  generator,
  terminal,
  signature,
  admin,
  crm,
  colors,
  keynote,
  password,
  weather,
  tres,
  notesv2,
  interview,
  lang,
];

function AllWorks() {
  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={32}
      speed={600}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop
      keyboard
      modules={[Navigation, Keyboard, Pagination, Scrollbar, A11y, Autoplay]}
    >
      {data.project.map((p, i) => (
        <WorkSlide key={p.name}>
          <WorkCards
            imglink={projectIcons[i]}
            title={p.name}
            projectLink={p.link}
            descr={p.description}
            code={{
              path: p.github,
              code_name: "Code",
            }}
          />
        </WorkSlide>
      ))}
    </Swiper>
  );
}

export default memo(AllWorks);
