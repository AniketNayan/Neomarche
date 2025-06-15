import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginUI from './components/LoginUI';
import SignupUI from './components/SignupUI';
import ForgotUI from './components/ForgotUI';
import VerifyUI from './components/VerifyUI';
import ResetUI from './components/ResetUI';
import BrandInformation from './components/BrandInformation';
import Templates from './components/templates'; // Import the new component
import StorePreference from './components/StorePreference'; // Import StorePreference component
import ProductInstructionVideo from './components/ProductInstructionVideo';
import ThreeDProduct from './components/3dproduct'; // Import ThreeDProduct component
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginUI />} />
        <Route path="/signup" element={<SignupUI />} />
        <Route path="/forgot" element={<ForgotUI />} />
        <Route path="/verify" element={<VerifyUI />} />
        <Route path="/reset" element={<ResetUI />} />
        <Route path="/BrandInformation" element={<BrandInformation />} />
        <Route path="/templates" element={<Templates />} /> {/* Added route */}
        <Route path="/StorePreference" element={<StorePreference />} /> {/* Added route */}
        <Route path="/ProductInstructionVideo" element={<ProductInstructionVideo />} /> {/* Added route */}
        <Route path="/3DProduct" element={<ThreeDProduct />} /> {/* Added route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;