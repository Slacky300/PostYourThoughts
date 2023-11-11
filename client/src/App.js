import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Thoughts from './pages/Thoughts';
import AddThoughts from './pages/AddThoughts';
import YourThoughts from './pages/YourThoughts';
import Register from './pages/Register';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './components/ProtectedRoutes';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thoughts" element={<Thoughts />} />

        <Route path="*" element={<h1>Not Found</h1>} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path='/' element={<ProtectedRoutes />} >
          <Route path="/add-thoughts" element={<AddThoughts />} />
          <Route path="/your-thoughts" element={<YourThoughts />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
