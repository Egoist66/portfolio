import styled from "styled-components";



function App() {
  return (
    <div className="App">

      <Title _color={'red'}>Hello world</Title>

      <svg width="100" height="100">
        <use xlinkHref="../assets/icons/code-svg.svg#css3-svg" />
      </svg>
      
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
