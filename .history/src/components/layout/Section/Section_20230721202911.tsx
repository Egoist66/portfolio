import styled from 'styled-components';

type SectionPropsType = {
    bg_color?: string
}


const Section = styled.section<SectionPropsType>(props => ({
    height: '100%',
    padding: '100px 20px',
    backgroundColor: props.bg_color

}))

export default Section