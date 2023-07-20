import styled from "styled-components";
import avatar from '../assets/images/avatar.png'

function App() {
  return (
    <div className="App">

      <Title _color={'red'}>Hello world</Title>
      <img src={avatar} alt="avatar" />
      
    </div>
  );
}


type TitleProps = {
  _color?: string
}


const Title = styled.h1<TitleProps>(props => ({
  color: props._color,
  fontWeight: "bold"
}))

export default App;
