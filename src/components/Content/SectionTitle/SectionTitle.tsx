import styled from "styled-components";
import Text from "../../../service/TEXT/TEXT";

type SectionTitleProps = {
  text?: string;
  font_size?: string;
};

const TitleWrap = styled.div`
  text-align: center;
  margin-bottom: clamp(2rem, 5vw, 3rem);
`;

const AccentLine = styled.div`
  width: 48px;
  height: 4px;
  margin: 1.25rem auto 0;
  border-radius: ${({ theme }) => theme.styles.radius.full};
  background: ${({ theme }) => theme.styles.colors.accentGradient};
`;

function SectionTitle({ text, font_size }: SectionTitleProps) {
  return (
    <TitleWrap>
      <Text
        font_size={font_size ?? "clamp(1.75rem, 4vw, 2.25rem)"}
        centered="true"
        type="h2"
      >
        {text}
      </Text>
      <AccentLine />
    </TitleWrap>
  );
}

export default SectionTitle;
