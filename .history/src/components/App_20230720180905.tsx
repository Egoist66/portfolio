import styled from "styled-components";

function App() {
  return (
    <div className="App">

      <Title className="title" _color={'red'}>Hello world</Title>
      
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
