import styled from "styled-components";

function App() {
  return (
    <div className="App">

      
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
