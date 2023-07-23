import styled from "styled-components";
import SVG from "../../../../service/SVG/SVG";

import skills from '../../../../data/skills.json'
import sprite from '../../../../assets/icons/sprite.svg'
import DIV from "../../../../service/DIV/DIV";
import Text from "../../../../service/TEXT/TEXT";

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
                    <DIV>
                        <SVG width="100" height="100" url={`${skillsImages[i]}`} />
                    </DIV>
                    <Text type="h2">{skill.title}</Text>
                    <p>{skill.description}</p>
                </DIV>
            ))}
        
        </SkillsGrid>
    )
}

export default SkillsCards