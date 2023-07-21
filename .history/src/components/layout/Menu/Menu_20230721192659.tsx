import styled from "styled-components";
import DIV from "../../../service/DIV/DIV";

import menuToggleIcon from '../../../assets/icons/menu-icon.svg'
import { useState } from "react";

function Menu(){

    const [counter, setCounter] = useState(0)

    const makeCount = () => {
        setCounter(counter => counter + 1)
    }

    const StyledMenu = styled.div((props) => ({
        display: 'flex',
        justifyContent: 'flex-end'
    }))

    const MenuImage = styled.img((props) => ({
        display: 'block',
    }))

    return (
        <StyledMenu>
            <DIV>
                <MenuImage src={menuToggleIcon} />
            </DIV>
        </StyledMenu>
    )
}

export default Menu