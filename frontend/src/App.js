
import './App.css';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

function App() {
  return (
      <div className="App">
          <Header/>
          <div className="main-content">
              <div className="sidebar">
                  <Sidebar/>
              </div>
              <div className="content">
                  <SearchBar/>
              </div>
          </div>
      </div>
  );
}

export default App;
