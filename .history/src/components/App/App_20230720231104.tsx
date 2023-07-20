import styled from "styled-components";
import sprite from '../assets/icons/sprite.svg'


function App() {
  return (
    <div className="App">


      <svg width="100" height="100">
        <use xlinkHref={`${sprite}#react`} />
      </svg>
      
    </div>
  );
}




export default App;
