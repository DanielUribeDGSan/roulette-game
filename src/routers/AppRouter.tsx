import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { Home } from '../screens/Home';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
