import { Route, Routes } from 'react-router-dom';
import Profile from '../../admin/components/Profile/Profile';

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/my-profile/*" element={<Profile />} />
    </Routes>
  );
};

export default AdminRoute;
