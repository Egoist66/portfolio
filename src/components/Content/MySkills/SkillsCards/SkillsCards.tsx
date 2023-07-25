import styled from "styled-components";
import React from 'react'


import SVG from "../../../../service/SVG/SVG";
import skills from '../../../../data/skills.json'
import sprite from '../../../../assets/icons/sprite.svg'
import DIV from "../../../../service/DIV/DIV";
import Text from "../../../../service/TEXT/TEXT";


const skillsImages : Array<string> = [

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

export const SkillsFigure = styled.div({
    backgroundColor: '#333',
    width: '50px', 
    margin: '0px auto 50px auto',
    padding: '30px'

})

function SkillsCards() : JSX.Element{

    return (
        <SkillsGrid id="skills-grid">

            {skills.map((skill, i) => (
                <DIV className="skills-cards" key={skill.title}>
                    <SkillsFigure> 
                   
                        <SVG width="50" height="50" url={`${skillsImages[i]}`} />
                        
                    </SkillsFigure>
                    <Text centered="true" type="h2">{skill.title.toUpperCase()}</Text>
                    <Text centered="true" type="p">{skill.description}</Text>
                </DIV>
            ))}
        
        </SkillsGrid>
    )
}

export default SkillsCards