import styled from "styled-components";
import WorkRoutes from "../../../Router/WorkRoutes";

const StyledWorkWrapper = styled.div`
  width: 100%;
`;

function WorksWrapper() {
  return (
    <StyledWorkWrapper>
      <WorkRoutes />
    </StyledWorkWrapper>
  );
}

export default WorksWrapper;
