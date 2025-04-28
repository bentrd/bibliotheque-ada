import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Books from './pages/Books';
import Navbar from './components/Navbar';
import DebugWebmaster from './pages/DebugWebmaster';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/books" element={<Books />} />
        <Route path="/admin" element={<DebugWebmaster />} />
      </Routes>
    </Router>
  );
}

export default App;