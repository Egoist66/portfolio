import DIV from "../../../service/DIV/DIV"
import Text from "../../../service/TEXT/TEXT"

type SectionTitleProps = {
    text: string
}

function SectionTitle({text}: SectionTitleProps){

    return (
        <DIV style={{paddingBottom: 50}}>
            <Text centered="true" type="h2">{text}</Text>
            <DIV style={{
                borderBottom: '2px solid #7572D5', 
                width: 55,
                margin: '40px auto'
            }} />
        </DIV>
    )
}

export default SectionTitle