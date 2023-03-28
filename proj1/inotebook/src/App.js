import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import User from './components/User';

function App() {
  return (
    <div className="App">
      <>
        <Router >
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/user' element={<User />} />
          </Routes>
        </Router>
      </>
    </div>
  );
}

export default App;
