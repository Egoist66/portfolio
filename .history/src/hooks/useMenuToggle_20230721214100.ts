import { useState } from "react"

interface useMenuTogglePropsType {
    isToggled: boolean,
    toggleMenu: () => void
}

function useMenuToggle() : useMenuTogglePropsType {

    const [isToggled, setToggle] = useState<boolean>(true)

    const toggleMenu = () => {

        setToggle(isToggled => !isToggled)
    }



    return {
        isToggled,
        toggleMenu
    }
}

export default useMenuToggle