import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginUI from './components/auth/LoginUI';
import SignupUI from './components/auth/SignupUI';
import ForgotUI from './components/auth/ForgotUI';
import VerifyUI from './components/auth/VerifyUI';
import ResetUI from './components/auth/ResetUI';
import OnboardingUI from './components/OnboardingUI';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginUI />} />
        <Route path="/signup" element={<SignupUI />} />
        <Route path="/forgot" element={<ForgotUI />} />
        <Route path="/verify" element={<VerifyUI />} />
        <Route path="/reset" element={<ResetUI />} />
        <Route path="/onboarding" element={<OnboardingUI />} />
        <Route path="*" element={<LoginUI />} />
      </Routes>
    </Router>
  );
}

export default App;