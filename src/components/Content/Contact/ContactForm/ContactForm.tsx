import { useAppContext } from "../../../../context/AppContext";
import styled from "styled-components";

const StyledForm = styled.form({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  maxWidth: "540px",
  margin: "0 auto",
});

type StyledInputTypes = {
  place_holder?: string;
};

const StyledInput = styled.input.attrs<StyledInputTypes>((props) => ({
  type: "text",
  placeholder: props.place_holder,
}))({
  width: "100%",
  backgroundColor: "#252527",
  border: "1px solid #4A4A4A",
  color: "#fff",
  height: "32px",
  padding: "10px",
  outline: "none",
  fontSize: "16px",
  fontFamily: "Poppins",
  marginBottom: "30px",
});

const StyledTextArea = styled.textarea({
  width: "100%",
  border: "1px solid #4A4A4A",
  backgroundColor: "#252527",
  color: "#fff",
  padding: "10px",
  fontFamily: "Poppins",
  outline: "none",
  fontSize: "16px",
  minHeight: "155px",
  marginBottom: "30px",
  resize: "none",
});

const StyledContactLink = styled.button({
  width: "200px",
  height: "35px",
  padding: "5px",
  background: "#7572D5",
  color: "#fff",
  textAlign: 'center',
  border: "none",
});



function ContactForm() {
  const context = useAppContext();
 
  return (
    <StyledForm onSubmit={(e : React.FormEvent<HTMLFormElement>) => {e.preventDefault()}}>
      <StyledInput
        name="subject"
        value={context?.subject}
        onChange={context?.handleInput}
        place_holder="Subject"
      />
      <StyledTextArea
        placeholder="Body"
        name="body"
        value={context?.body}
        onChange={context?.handleInput}
      />

      <StyledContactLink>
        <a style={{display: 'block'}}  
        href={`mailto:razormad666@gmail.com?subject=${context?.subject}&body=${context?.body}.`}>{'send message'.toUpperCase()}</a>
      
      </StyledContactLink>
    </StyledForm>
  );
}

export default ContactForm;
