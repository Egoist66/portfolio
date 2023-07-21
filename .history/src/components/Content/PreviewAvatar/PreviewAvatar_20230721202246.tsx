import styled from "styled-components";
import DIV from "../../../service/DIV/DIV";
import Text from "../../../service/TEXT/TEXT";

import avatar from '../../../assets/images/avatar.svg'

function PreviewAvatar(){
    
    const AvatarWrapper = styled.div({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    })

    const PreviewTextBox = styled.div({
        display: 'flex',
        flexDirection: 'column'
       
    })

    const Aavatar = styled.img({
        display: 'block'
    })

    const PreviewAvatarBox = styled.div({})

    return (
        <AvatarWrapper>

            <PreviewTextBox>

                <Text type="p" font_size="14px">Hi There</Text>
                <Text type="h1" font_size="50px">I am Farid Makhmudov</Text>
                <Text type="p" font_size="27px">A Web Developer.</Text>


            </PreviewTextBox>

            <PreviewAvatarBox>

            </PreviewAvatarBox>

        </AvatarWrapper>
    )
}

export default PreviewAvatar