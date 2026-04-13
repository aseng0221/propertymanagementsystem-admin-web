import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Billing from './pages/Billing';
import Residents from './pages/Residents';
import Facilities from './pages/Facilities';
import Announcements from './pages/Announcements';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="billing" element={<Billing />} />
          <Route path="residents" element={<Residents />} />
          <Route path="facilities" element={<Facilities />} />
          <Route path="announcements" element={<Announcements />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;