import styled from "styled-components";
import DIV from "../../../service/DIV/DIV";
import Text from "../../../service/TEXT/TEXT";

function PreviewAvatar(){
    
    const AvatarWrapper = styled.div({
        display: 'flex',
        justifyContent: 'center'
    })

    const PreviewTextBox = styled.div({
        display: 'flex',
        flexDirection: 'column'
    })

    return (
        <AvatarWrapper>

            <PreviewTextBox>

                <Text type="p" font_size="14px">Hi There</Text>
                <Text type="h1" font_size="50px">I am Farid Makhmudov</Text>
                <Text type="p" font_size="27px">A Web Developer</Text>


            </PreviewTextBox>

        </AvatarWrapper>
    )
}

export default PreviewAvatar