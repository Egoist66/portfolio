import React from 'react'
import {useContext} from 'react'
import useMenuToggle from '../hooks/useMenuToggle'


interface AppContextValues {
    isToggled: boolean,
    toggleMenu: () => void
}


const Context = React.createContext<AppContextValues | null>(null)
export const useAppContext = () =>  {
    return useContext(Context)
}


function AppContext({children} : any){

    const {isToggled, toggleMenu} = useMenuToggle()
    const data : AppContextValues = {
        isToggled,
        toggleMenu
    }


    return (
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )
}

export default AppContext