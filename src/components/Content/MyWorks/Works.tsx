import WorkLinks from "../../Router/WorkLinks";
import SectionTitle from "../SectionTitle/SectionTitle";
import WorksWrapper from "./WorksWrapper/WorksWrapper";

function Works() : JSX.Element{


    return (
        <>
        
            <SectionTitle text="My works" />
            <WorkLinks />


            <WorksWrapper />
            
            
        
        </>
    )
}

export default Works