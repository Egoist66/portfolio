import DIV from "../../../../service/DIV/DIV";
import { SkillsFigure } from "../../MySkills/SkillsCards/SkillsCards";

import quotte from '../../../../assets/icons/quote-alt-right-svg 1.svg'
import Text from "../../../../service/TEXT/TEXT";

function TestimonyWrapper(){
    return (

        <DIV>

            <SkillsFigure>
                <img src={quotte} alt="quotte" />
            </SkillsFigure>

            <Text margin_auto="true" mw="600px" centered="true">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </Text>

            <Text centered="true">{'@Rob Halford'.toUpperCase()}</Text>

        </DIV>
    )
}

export default TestimonyWrapper