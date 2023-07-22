import DIV from "../../../service/DIV/DIV";
import Text from "../../../service/TEXT/TEXT";
import SkillsCards from "./SkillsCards/SkillsCards";


function Skills(){

    return (
        <>
       
            <DIV style={{paddingBottom: 50}}>
                <Text centered="true" type="h2">My skills</Text>
                <DIV style={{borderBottom: '3px solid #7572D5', width: 55}} />
            </DIV>

            <SkillsCards/>
                
    
       
       
        </>
    )

}

export default Skills