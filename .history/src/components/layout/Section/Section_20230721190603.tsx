import styled from 'styled-components';

type SectionPropsType = {
    bgColor: string
}


const Section = styled.section(props => ({
    height: '100vh',

}))

export default Section