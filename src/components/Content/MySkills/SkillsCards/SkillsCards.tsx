import styled from "styled-components";
import React from 'react'
import skills from '../../../../data/skills.json'
import DIV from "../../../../service/DIV/DIV";
import Text from "../../../../service/TEXT/TEXT";

import css3 from '../../../../assets/images-2/css.png'
import bs from '../../../../assets/images-2/bs.png'
import git from '../../../../assets/images-2/git.png'
import html from '../../../../assets/images-2/html.png'
import js from '../../../../assets/images-2/js.png'
import jq from '../../../../assets/images-2/jquery.png'
import native from '../../../../assets/images-2/native.webp'
import react from '../../../../assets/images-2/react.png'
import reduxicon from '../../../../assets/images-2/redux.png'
import saga from '../../../../assets/images-2/redux-saga.svg'
import query from '../../../../assets/images-2/react-q.png'
import sass from '../../../../assets/images-2/sass.png'
import styledicon from '../../../../assets/images-2/styled.png'
import ts from '../../../../assets/images-2/ts.png'
import tailwind from '../../../../assets/images-2/tailwind.png'
import fire from '../../../../assets/images-2/fire.png'
import ant from '../../../../assets/images-2/ant.png'
import story from '../../../../assets/images-2/story.png'
import jest from '../../../../assets/images-2/jest.webp'
import php from '../../../../assets/images-2/php.png'
import alpine from '../../../../assets/images-2/alpine.png'
import vue from '../../../../assets/images-2/vue.png'


import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css/bundle';
import {A11y, Autoplay, Keyboard, Navigation, Pagination, Scrollbar} from 'swiper';


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
    vue


]


const SkillsGrid = styled.div(props => ({
    

}))

export const SkillsFigure = styled.div({
    backgroundColor: '#333',
    width: '50px',
    margin: '0px auto 50px auto',
    padding: '30px',
    height: '60px',
    boxShadow: '1px 1px 13px 1px #7472D5',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center'

})

function SkillsCards(): JSX.Element {

    return (
        <SkillsGrid id="skills-grid">


            <Swiper

                slidesPerView={3}
                speed={500}
                parallax
                loop
                autoplay
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
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                modules={[Navigation, Keyboard, Pagination, Scrollbar, A11y, Autoplay]}
            >

                {skills.map((skill, i) => (
                    <SwiperSlide key={i}>
                        <DIV className="skills-cards" key={skill.title}>
                        <SkillsFigure>
                            <img alt={_skillsImages[i]} src={_skillsImages[i]} />

                        </SkillsFigure>
                        <Text centered="true" type="h2">{skill.title.toUpperCase()}</Text>
                    </DIV>
                    </SwiperSlide>
                ))}


            </Swiper>



        </SkillsGrid>
    )
}

export default SkillsCards