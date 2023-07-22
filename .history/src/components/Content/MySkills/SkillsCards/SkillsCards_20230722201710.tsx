import styled from "styled-components";
import SVG from "../../../../service/SVG/SVG";

import skills from '../../../../data/skills.json'
import sprite from '../../../../assets/icons/sprite.svg'
import DIV from "../../../../service/DIV/DIV";

console.log(sprite);

const skillsImages = [

    `${sprite}#code`,
    `${sprite}#css3`,
    `${sprite}#react`,
    `${sprite}#ts`,
    `${sprite}#styledCom`,
    `${sprite}#figma`,

]


const SkillsGrid = styled.div(props => ({
    display: 'grid'
}))

function SkillsCards(){

    return (
        <SkillsGrid>

            {skills.map((skill, i) => (
                <DIV className="skills-cards" key={skill.title}>
                    <h2>{skill.title}</h2>
                    <p>{skill.description}</p>
                </DIV>
            ))}
        
        </SkillsGrid>
    )
}

export default SkillsCards