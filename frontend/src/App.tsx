import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PatientDirectory from './pages/PatientDirectory';
import DoctorDirectory from './pages/DoctorDirectory';
import Appointments from './pages/Appointments';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<PatientDirectory />} />
          <Route path="doctors" element={<DoctorDirectory />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="departments" element={<div className="p-8">Departments (Coming Soon)</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
