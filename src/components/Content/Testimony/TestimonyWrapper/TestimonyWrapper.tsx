import DIV from "../../../../service/DIV/DIV";
import { SkillsFigure } from "../../MySkills/SkillsCards/SkillsCards";

import quotte from '../../../../assets/icons/quote-alt-right-svg 1.svg'
import Text from "../../../../service/TEXT/TEXT";

function TestimonyWrapper() {
    return (

        <DIV>

            <SkillsFigure>
                <img src={quotte} alt="quotte" />
            </SkillsFigure>

            <Text margin_auto="true" mw="600px" centered="true">
                I've been doing front-end development for 3 and a half years now - I absolutely love my job and what I come across every day. Challenges for me are a growth area. Constant practice and immersion in the deeper corners of the technology world makes me stronger. In my free time from IT, I try to relax because mental respite is important in our work. I listen to music, practice vocals, which is my old hobby 😉
                Here is my full <a style={{color: "#7472D5", textDecoration: 'underline 1px solid'}} target="_blank" href="https://resume.io/r/saOeT5n8s">CV info</a>
            </Text>

        </DIV>
    )
}

export default TestimonyWrapper