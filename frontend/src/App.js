
import './App.css';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
  return (
      <div className="App">
          <Header/>
          <div className="main-content">
              <Sidebar/>
          </div>
      </div>
  );
}

export default App;
