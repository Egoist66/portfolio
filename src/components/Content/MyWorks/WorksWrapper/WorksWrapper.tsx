import styled from "styled-components"
import WorkRoutes from "../../../Router/WorkRoutes"

const StyledWorkWrapper = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '60px',
    flexWrap: 'wrap'
})

function WorksWrapper(){
    return (

        <StyledWorkWrapper>

            <WorkRoutes />
            

        </StyledWorkWrapper>
    )
}

export default WorksWrapper