import sprite from '../../assets/icons/sprite.svg'
import SVG from "../../service/SVG/SVG";


function App() {
  return (
    <div className="App">

      <SVG width="100" height="100" params={{path: sprite, id: "#react"}} />

      
    </div>
  );
}




export default App;
