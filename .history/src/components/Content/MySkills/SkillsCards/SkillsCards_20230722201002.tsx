import styled from "styled-components";
import SVG from "../../../../service/SVG/SVG";

import skills from '../../../../data/skills.json'




const SkillsGrid = styled.div(props => ({
    display: 'grid'
}))

function SkillsCards(){

    return (
        <SkillsGrid>

            {skills.map(skill => (
                <div key={skill.title}>
                    <SVG width="100" height="100" url={skill.image} />
                    <h2>{skill.title}</h2>
                    <p>{skill.description}</p>
                </div>
            ))}
        
        </SkillsGrid>
    )
}

export default SkillsCards