import './App.css';
import Header from "./components/Header";
import AppRoutes from "./routers";
import {BrowserRouter} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Header/>
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
        </div>
    );
}

export default App;
