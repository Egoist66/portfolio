import React from 'react'
import {useContext} from 'react'
import useMenuToggle from '../hooks/useMenuToggle'


interface AppContextValues {
    isToggled: boolean,
    toggleMenu: () => void
}


const Context = React.createContext({})
export const useAppContext = () =>  {
    return useContext(Context)
}


function AppContext({children} : any){

    const {isToggled, toggleMenu} = useMenuToggle()


    return (
        <Context.Provider value={{
            isToggled,
            toggleMenu
        }}>
            {children}
        </Context.Provider>
    )
}

export default AppContext