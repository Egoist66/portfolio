import { useState } from "react"

function useMenuToggle() : object {

  const [isToggled, setToggle] = useState(false)

    const toggleMenu = () => {
        
        setToggle(isToggled => !isToggled)
    }



    return {
        
    }
}