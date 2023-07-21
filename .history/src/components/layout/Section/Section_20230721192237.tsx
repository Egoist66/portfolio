import styled from 'styled-components';

type SectionPropsType = {
    bg_Color?: string
}


const Section = styled.section<SectionPropsType>(props => ({
    height: '100vh',
    padding: '20px',
    backgroundColor: props.bg_Color

}))

export default Section