import styled from "styled-components";
import DIV from "../../../service/DIV/DIV";
import Text from "../../../service/TEXT/TEXT";

import avatar from "../../../assets/images/avatar.svg";
import Container from "../../Container/Container";

const AvatarWrapper = styled.div({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  height: "100%",
  flexWrap: "wrap",
});

const PreviewTextBox = styled.div({
  display: "flex",
  flexDirection: "column",
});

const Avatar = styled.img({
  display: "block",
});

const PreviewAvatarBox = styled.div({});

function PreviewAvatar() {
  

  return (
    <Container>
      <AvatarWrapper>
        <PreviewTextBox>
          <Text type="p" font_size="14px">
            Hi There
          </Text>
          <Text type="h1" font_size="50px">
            I am Farid Makhmudov
          </Text>
          <Text type="p" font_size="27px">
            A Web Developer.
          </Text>
        </PreviewTextBox>

        <PreviewAvatarBox>
          <Avatar src={avatar} />
        </PreviewAvatarBox>
      </AvatarWrapper>
    </Container>
  );
}

export default PreviewAvatar;
