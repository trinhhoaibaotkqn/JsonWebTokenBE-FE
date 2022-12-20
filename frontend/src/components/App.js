import './App.scss';
import Home from './Home/Home';
import Login from './Login/Login';
import Header from './Navigation/Header';
import Register from './Register/Register';
import Admin from './Admin/Admin';
// import 'bootstrap/dist/css/bootstrap.min.css';


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="header-container">
          <Header />
        </div>
        <div className="main-container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
