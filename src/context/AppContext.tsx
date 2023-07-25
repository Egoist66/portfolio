import React, {ReactNode} from 'react'
import {useContext} from 'react'
import useMenuToggle from '../hooks/useMenuToggle'
import useContact from '../hooks/useContact'


interface AppContextValues {
    isToggled?: boolean,
    toggleMenu?: () => void,
    handleInput?:(e : any) => void,
    body?: string,
    subject?: string,
}


const Context = React.createContext<AppContextValues | null>(null)
export const useAppContext = () =>  {
    return useContext(Context)
}


interface AppContextChildren {
    children: ReactNode
}

function AppContext({children} : AppContextChildren){

    const {isToggled, toggleMenu} = useMenuToggle()
    const {handleInput, subject, body} = useContact('')

    const data : AppContextValues = {
        isToggled,
        toggleMenu,
        body,
        subject,
        handleInput
        
    }


    return (
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )
}

export default AppContext