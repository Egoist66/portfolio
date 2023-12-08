import {useNavigate} from "react-router-dom";
import Layout from "../Layout/Layout";
import {useEffect} from "react";

function App() {

    const navigate = useNavigate()

    useEffect(() => {
        navigate('/all')
    }, [])


    return (

        <Layout/>


    )
}


export default App;
