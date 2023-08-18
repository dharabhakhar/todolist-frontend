import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Forgot from './Pages/Forgot';
import ChangePassword from './Pages/ChangePassword';
import Protected from './Services/Protected';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/change_password/:id" element={<ChangePassword />} />
          <Route path="/home/:id" element={<Protected><Dashboard/></Protected>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
