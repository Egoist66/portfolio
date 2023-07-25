import { useAppContext } from "../../../context/AppContext";
import SectionTitle from "../SectionTitle/SectionTitle";
import ContactForm from "./ContactForm/ContactForm";

function Contact(){
    const context = useAppContext()
    
    return (
        <>
        
            <SectionTitle text="Contact" />

            <ContactForm />


        </>
    )
}

export default Contact