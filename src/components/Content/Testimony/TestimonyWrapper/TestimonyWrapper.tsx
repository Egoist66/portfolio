import styled from "styled-components";
import { Link } from "react-router-dom";
import quotte from "../../../../assets/icons/quote-alt-right-svg 1.svg";
import Text from "../../../../service/TEXT/TEXT";

const QuoteCard = styled.blockquote`
  max-width: 680px;
  margin: 0 auto;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  text-align: center;
  background: ${({ theme }) => theme.styles.colors.surface};
  border: 1px solid ${({ theme }) => theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.xl};
  box-shadow: ${({ theme }) => theme.styles.shadow.md};
`;

const QuoteIcon = styled.div`
  width: 56px;
  height: 56px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(124, 108, 240, 0.12);
  border-radius: ${({ theme }) => theme.styles.radius.lg};

  img {
    width: 28px;
    height: 28px;
    opacity: 0.9;
  }
`;

const CvLink = styled(Link)`
  color: ${({ theme }) => theme.styles.colors.decorColorLight};
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color ${({ theme }) => theme.styles.transition.fast};

  &:hover {
    color: #c4b5fd;
  }
`;

function TestimonyWrapper() {
  return (
    <QuoteCard>
      <QuoteIcon>
        <img src={quotte} alt="" />
      </QuoteIcon>

      <Text margin_auto="true" centered="true" font_size="1.0625rem">
        I&apos;ve been doing front-end development for 7 years now — I absolutely
        love my job and what I come across every day. Challenges for me are a
        growth area. Constant practice and immersion in the deeper corners of
        the technology world makes me stronger. In my free time from IT, I try to
        relax because mental respite is important in our work. I listen to music,
        practice vocals, which is my old hobby 😉 Here is my full{" "}
        <CvLink to="/career">
          CV info
        </CvLink>
      </Text>
    </QuoteCard>
  );
}

export default TestimonyWrapper;
