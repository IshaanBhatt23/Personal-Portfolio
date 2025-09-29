import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import './index.css'; // Your global styles

const App = () => {
  return (
    <Router>
      <Routes>
        {/* The main path "/" renders your entire single-page portfolio */}
        <Route path="/" element={<Index />} />

        {/* This is a catch-all for any other URL, which will show your "Not Found" page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;