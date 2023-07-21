import styled from "styled-components";

function Menu(){

    const StyledMenu = styled.div((props) => ({
        display: 'flex',
        justifyContent: 'flex-end'
    }))

    return StyledMenu
}

export default Menu