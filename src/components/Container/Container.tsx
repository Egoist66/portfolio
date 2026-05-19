import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.styles.container.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.styles.container.padding};
`;

export default Container;
