import styled from "styled-components";
import sprite from '../assets/icons/code-svg.svg'


function App() {
  return (
    <div className="App">

      <Title _color={'red'}>Hello world</Title>

      <svg width="100" height="100">
        <use xlinkHref={`${sprite}#react`} />
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
