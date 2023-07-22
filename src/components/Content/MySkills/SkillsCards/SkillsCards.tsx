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
    display: 'grid',
    gridTemplateRows: 'repeat(2, 1fr)',
    gridTemplateColumns: 'repeat(3, 1fr)',
    justifyItems: 'center',
    gap: '20px'

}))

function SkillsCards(){

    return (
        <SkillsGrid id="skills-grid">

            {skills.map((skill, i) => (
                <DIV className="skills-cards" key={skill.title}>
                    <DIV 
                    style={{
                        backgroundColor: '#333',
                         width: 50, 
                         margin: '0px auto 50px auto',
                         padding: 30
                        }}>
                        <SVG width="50" height="50" url={`${skillsImages[i]}`} />
                    </DIV>
                    <Text centered="true" type="h2">{skill.title.toUpperCase()}</Text>
                    <Text centered="true" type="p">{skill.description}</Text>
                </DIV>
            ))}
        
        </SkillsGrid>
    )
}

export default SkillsCards