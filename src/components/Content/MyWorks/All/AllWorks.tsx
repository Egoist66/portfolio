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
import todolist from '../../../../assets/project/todolist.png'
import social from '../../../../assets/project/social.png'
import terminal from '../../../../assets/project/terminal.png'
import signature from '../../../../assets/project/signature.png'

const projectIcons = [
    marvel,
    notes,
    pencil,
    editor,
    convert,
    todolist,
    social,
    terminal,
    signature
]

function AllWorks() {


    return (

        <>

            <Swiper
            
                slidesPerView={1}
                speed={1700}
                spaceBetween={80}
                autoplay
                parallax
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
                        slidesPerView: 2,
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

export default AllWorks