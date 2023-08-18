import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import AddTask from './pages/Add_Task';
import AllTask from './pages/AllTask';
import User from './pages/Add_user';
import Forgot from './pages/Forgot';
import ChangePassword from './pages/ChangePassword';
import Protected from './Services/Protected';

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/change_password/:id" element={<ChangePassword />} />
          <Route path="/home" element={<Protected><Home /></Protected>} />
          <Route path="/add_task" element={<Protected><AddTask /></Protected>} />
          <Route path="/task/:id" element={<Protected><AllTask /></Protected>} />
          <Route path="/add_user" element={<Protected><User /></Protected>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
