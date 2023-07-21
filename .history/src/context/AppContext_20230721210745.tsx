import React from 'react'
import {useContext} from 'react'
import useMenuToggle from '../hooks/useMenuToggle'

const Context = React.createContext({})
export const useAppContext = () => {
    return useContext(Context)
}


function AppContext(){

    const {isToggled, toggleMenu} = useMenuToggle()


    return (
        <Context.Provider value={{
            isToggled,
            toggleMenu
        }}>

        </Context.Provider>
    )
}

return AppContext