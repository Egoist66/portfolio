import styled from "styled-components";
import DIV from "../../../service/DIV/DIV";

import menuToggleIcon from '../../../assets/icons/menu-icon.svg'
import { useAppContext } from "../../../context/AppContext";

function Menu(){

    const context = useAppContext()
  
    const StyledMenu = styled.div((props) => ({
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'absolute',
        top: '20px',
        right: '20px'
    }))

    const MenuImage = styled.img((props) => ({
        display: 'block',
        cursor: 'pointer'
    }))

    return (
        <StyledMenu>
            <DIV>
                <MenuImage onClick={context?.toggleMenu}  src={menuToggleIcon} />
            </DIV>
        </StyledMenu>
    )
}

export default Menu