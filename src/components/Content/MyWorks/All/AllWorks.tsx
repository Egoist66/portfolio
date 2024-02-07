import WorkCards from "../WorksCards/WorkCards";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle';
import { Navigation, Keyboard, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

import data from '../../../../data/project.json'
import marvel from '../../../../assets/project/marvel.png'
import notes from '../../../../assets/project/notes.png'
import pencil from '../../../../assets/project/codepencil.png'
import editor from '../../../../assets/project/editor.png'
import convert from '../../../../assets/project/convert.png'
import todolist from '../../../../assets/images-2/todo.png'
import social from '../../../../assets/project/social.png'
import terminal from '../../../../assets/images-2/terminal.png'
import signature from '../../../../assets/project/signature.png'
import generator from '../../../../assets/project/generator.png'
import admin from '../../../../assets/project/admin.png'
import {memo} from "react";

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
    admin
]
function AllWorks() {


    return (

        <>

            <Swiper
            
                slidesPerView={3}
                speed={1000}
                spaceBetween={80}
                autoplay
                loop
                autoHeight
                keyboard
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    480: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 1,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                modules={[Navigation, Keyboard, Pagination, Scrollbar, A11y, Autoplay]}
            >

                {data.project.map((p, i) => (
                    <SwiperSlide
                    key={i}>
                        <WorkCards
                            imglink={projectIcons[i]}
                            title={p.name}
                            projectLink={p.link}
                            descr={p.description}
                            code={{
                                path: p.github,
                                code_name: "Code"
                            }}
                        />



                    </SwiperSlide>
                ))}


            </Swiper>

        </>
    )
}

export default memo(AllWorks)