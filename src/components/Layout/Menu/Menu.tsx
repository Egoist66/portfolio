import styled from "styled-components";
import DIV from "../../../service/DIV/DIV";

import menuToggleIcon from '../../../assets/icons/menu-icon.svg'
import menuCloseIcon from '../../../assets/icons/close-btn.svg'
import { useAppContext } from "../../../context/AppContext";


const StyledMenu = styled.div((props) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: '20px',
    right: '20px',
    zIndex: 99999
}))

const MenuImage = styled.img((props) => ({
    display: 'block',
    cursor: 'pointer'
}))

function Menu(){

    const context = useAppContext()
  
    const icon = !context?.isToggled ? menuCloseIcon  : menuToggleIcon

    return (
        <StyledMenu>
            <DIV>
                <MenuImage onClick={context?.toggleMenu}  src={icon} />
            </DIV>
        </StyledMenu>
    )
}

export default Menu