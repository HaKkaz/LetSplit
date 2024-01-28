import logo from './logo.svg';
import './App.css';
import Home from './components/home.tsx';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Event from './components/event.tsx';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event" element={<Event />} />
          </Routes>

          {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Start Splitting!
        </a> */}
        </header>

      </div>
    </Router>
  );
}

export default App;
