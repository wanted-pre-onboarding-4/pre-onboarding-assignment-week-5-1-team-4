import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './pages/search/Search';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="*" element={<div>404page</div>} />
      </Routes>
    </Router>
  );
}
