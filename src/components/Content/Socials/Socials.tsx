import SectionTitle from "../SectionTitle/SectionTitle";
import styled from "styled-components";
import sprite from '../../../assets/icons/sprite.svg'
import SVG from "../../../service/SVG/SVG";

import telegram from '../../../assets/socials/tgsvg.svg';
import inst from '../../../assets/socials/social icon.svg';
import vk from '../../../assets/socials/social icon (1).svg';
import linked from '../../../assets/socials/social icon (2).svg';
import Text from "../../../service/TEXT/TEXT";

const socialIcons : Array<string> = [
    telegram,
    inst,
    vk,
    linked
]

const links : Array<string> = [
    'https://t.me/Farid_Mahmudov',
    'https://www.instagram.com/eg0ist66/',
    'https://vk.com/metalmaniac_666',
    'https://www.linkedin.com/in/farid-mahmudov-1624a8227'

]


const StyledSocialNav = styled.nav({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '50px'
})

const StyledSocialList = styled.ul({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px'
})

const StyledSocialLinks = styled.li({
})
function Socials(){
    return (
        <>

            <SectionTitle font_size={'22px'} text={'I am in social media'} />

            <StyledSocialNav>

                <StyledSocialList>
                    {socialIcons.map((social, i) => (
                        <StyledSocialLinks key={social}>
                            <a target={'_blank'} href={links[i]}>
                                <img src={social} alt="soclial"/>
                            </a>
                        </StyledSocialLinks>
                    ))}
                </StyledSocialList>

            </StyledSocialNav>

            <Text centered={'true'} font_size={'14px'}>© 2023 Farid Makhmudov, All Rights Reserved.</Text>

        </>
    )
}

export default Socials