function AppContext(){

    const Context = React.createContext(null)


    return (
        <Context.Provider value={2}>

        </Context.Provider>
    )
}