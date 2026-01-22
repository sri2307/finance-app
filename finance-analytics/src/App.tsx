import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RequireAuth } from './features/auth/components/RequireAuth';
import { Dashboard } from './features/dashboard/Dashboard';
import { Login } from './features/auth/components/Login';


const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
        
        <Route element={<RequireAuth />}> 
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  )
}

export default App