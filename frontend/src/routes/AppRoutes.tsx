import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../features/ auth/Login';
import NotFound from '../pages/NotFound'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
