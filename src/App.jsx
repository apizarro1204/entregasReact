import ItemListContainer from "./components/ItemListContainer";
import NavBar from "./components/NavBar";
ItemListContainer
import "./index.css";

function App() {
  return (
      <div>
        <NavBar />
        <ItemListContainer greeting={'Listado Productos'}/>
      </div>
      
  )
}

export default App;
