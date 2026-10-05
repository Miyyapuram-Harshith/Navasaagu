import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Simulator from './pages/Simulator';
import Weather from './pages/Weather';
import AIAssistant from './pages/AIAssistant';
import FarmMap from './pages/FarmMap';
import Resources from './pages/Resources';

import { SimulationProvider } from './store/SimulationContext';

function App() {
  return (
    <SimulationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/farm" element={<FarmMap />} />
          <Route path="/dashboard/simulator" element={<Simulator />} />
          <Route path="/dashboard/weather" element={<Weather />} />
          <Route path="/dashboard/ai" element={<AIAssistant />} />
          <Route path="/dashboard/resources" element={<Resources />} />
        </Routes>
      </Router>
    </SimulationProvider>
  );
}

export default App;
