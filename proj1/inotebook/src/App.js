import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import User from './components/User';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <>
      <NoteState>
        <Router >
          <Navbar />
          <Alert message={"This is an alert !"} />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/user' element={<User />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
