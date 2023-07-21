import { useState } from "react"



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