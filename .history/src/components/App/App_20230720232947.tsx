import sprite from '../../assets/icons/sprite.svg'
import SVG from "../../service/SVG/SVG";
import Container from '../Container/Container';


function App() {
  return (
    <div className="App">

      <Container>
        <SVG 
          width="100" 
          height="100" 
          params={{path: sprite, id: "#react"}} 
        />
      </Container>

      
    </div>
  );
}




export default App;
