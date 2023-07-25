import { useState, useEffect } from "react"

interface useMenuTogglePropsType {
    isToggled: boolean,
    toggleMenu: () => void
}



function useMenuToggle() : useMenuTogglePropsType {

    const [isToggled, setToggle] = useState<boolean>(true)

    const toggleMenu = () => {

        setToggle(isToggled => !isToggled)
    }

    useEffect(() => {
        function closeNav(e: KeyboardEvent){
            if(e.key === "Escape"){
                setToggle(true)
            }
        }
        document.addEventListener('keydown', closeNav)


        return () => {
            document.removeEventListener('keydown', closeNav)
        }
    }, [])


    return {
        isToggled,
        toggleMenu
    }
}

export default useMenuToggle