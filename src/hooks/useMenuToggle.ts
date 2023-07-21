import { useState } from "react"

interface useMenuTogglePropsType {
    isToggled: boolean,
    toggleMenu: () => void
}

function useMenuToggle() : useMenuTogglePropsType {

    const [isToggled, setToggle] = useState<boolean>(false)

    const toggleMenu = () => {

        setToggle(isToggled => !isToggled)
    }

    

    return {
        isToggled,
        toggleMenu
    }
}

export default useMenuToggle