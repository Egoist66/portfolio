import styled from "styled-components";

function App() {
  return (
    <div className="App">

      <Title>Hello world</Title>
      
    </div>
  );
}


type TitleProps = {
  color?: 'string'
}


const Title = styled.h1<TitleProps>(props => ({
  color: props.color,
  fontWeight: "bold"
}))

export default App;
