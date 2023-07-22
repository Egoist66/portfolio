import DIV from "../../../service/DIV/DIV";
import Text from "../../../service/TEXT/TEXT";
import SkillsCards from "./SkillsCards/SkillsCards";


function Skills(){

    return (
        <>
       
            <DIV style={{paddingBottom: 50}}>
                <Text centered="true" type="h2">My skills</Text>
            </DIV>

            <SkillsCards/>
                
    
       
       
        </>
    )

}

export default Skills