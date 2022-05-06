import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Tickets from './pages/Tickets';
import Project from './pages/Project';
import Profile from './pages/Profile';
import './styles/Style.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<Login/>}/>
        <Route  path="/register" element={<Register/>}/>
        <Route  path="/main" element={<Dashboard/>}/>
        <Route  path="/profile" element={<Profile/>}/>
        <Route  path="/tickets" element={<Tickets/>}/>        
        <Route  path="/project/:projectid" element={<Project/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </Router>
  );
}
export default App;
