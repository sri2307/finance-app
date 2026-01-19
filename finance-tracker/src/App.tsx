import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './features/tracker/components/Dashboard';
import { RequireAuth } from './features/auth/components/RequireAuth'; // 👈 Import it

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* PUBLIC ROUTES (If any) */}
        
        {/* PROTECTED ROUTES */}
        <Route element={<RequireAuth />}> {/* 👈 The Bouncer is here */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default App;