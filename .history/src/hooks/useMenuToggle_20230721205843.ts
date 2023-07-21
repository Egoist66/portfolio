import { useState } from "react"

type useMenuTogglePropsType = {
    isToggled: boolean,
    toggleMenu: () => void
}

function useMenuToggle() : object {

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