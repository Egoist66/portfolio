import styled from "styled-components";

function App() {
  return (
    <div className="App">
      
    </div>
  );
}


type TitleProps = {
  color?: 'string'
}


const Title = styled.h1<TitleProps>(props => ({
  color: 'red',
  fontWeight: "bold"
}))

export default App;
