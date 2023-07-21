import styled from "styled-components";
import DIV from "../../../service/DIV/DIV";

import menuToggle from '../../../assets/icons/menu-icon.svg'

function Menu(){

    const StyledMenu = styled.div((props) => ({
        display: 'flex',
        justifyContent: 'flex-end'
    }))

    return (
        <StyledMenu>
            <DIV>

            </DIV>
        </StyledMenu>
    )
}

export default Menu