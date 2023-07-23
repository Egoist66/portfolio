import WorkCards from "../WorksCards/WorkCards";

import socialNetworkImg from '../../../../assets/images/Rectangle 16.png'
import timerImg from '../../../../assets/images/Rectangle 14.png'

function AllWorks(){
    return (

        <>
        
            <WorkCards 
                link={socialNetworkImg}
                title="Social Network"
                descr="This social Nework will blow your mind"
                demo={{
                    demo_name: "Demo",
                    path: '#'
                }}
                code={{
                    path: "#",
                    code_name: "Code"
                }}
            />
       
            <WorkCards 
                link={timerImg}
                title="Timer"
                descr="This social Nework will blow your mind"
                demo={{
                    demo_name: "Demo",
                    path: '#'
                }}
                code={{
                    path: "#",
                    code_name: "Code"
                }}
            />
       
       
        </>
    )
}

export default AllWorks