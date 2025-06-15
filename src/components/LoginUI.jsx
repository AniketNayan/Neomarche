import { Link } from 'react-router-dom';
import { PrimaryButton, InputField, Checkbox } from './AuthUtils';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginUI() {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const errorRef = useRef(null);

  const handleInputChange = (field) => (e) => {
    console.log(`Input changed for ${field}:`, e.target.value);
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
    setSubmissionMessage('');
  };

  const handleCheckboxChange = () => {
    const newRememberMe = !formData.rememberMe;
    console.log('Checkbox toggled to:', newRememberMe);
    setFormData({ ...formData, rememberMe: newRememberMe });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    console.log('Toggled showPassword to:', !showPassword);
  };

  const validateForm = () => {
    console.log('Validating form:', formData);
    const newErrors = {};
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    console.log('Validation errors set to:', newErrors);
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted - handleSubmit triggered');
    const validationErrors = validateForm();
    setErrors(validationErrors);
    console.log('Errors state after setErrors:', validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      console.log('Validation failed, errors displayed');
      if (errorRef.current) {
        console.log('Scrolling to error message area');
        errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorRef.current.focus();
      }
      return;
    }

    try {
      console.log('Calling login API with:', { phone: formData.phone, email: formData.email, password: formData.password });
      const response = await mockLogin(formData);
      if (!response.success) {
        throw new Error(response.message || 'Login failed');
      }

      setSubmissionMessage('Login successful! Redirecting...');
      console.log('API call successful:', response);
      setTimeout(() => {
        try {
          console.log('Attempting to navigate to /BrandInformation');
          navigate('/BrandInformation');
          console.log('Navigated to /BrandInformation');
        } catch (navError) {
          console.error('Navigation error:', navError);
          setSubmissionMessage('Error redirecting to brand information. Please try again.');
        }
      }, 1000);
    } catch (error) {
      console.error('API error:', error.message);
      setErrors({ general: error.message });
      setSubmissionMessage('Login failed. Please check your credentials and try again.');
      console.log('Submission message set to:', 'Login failed. Please check your credentials and try again.');
      if (errorRef.current) {
        console.log('Scrolling to error message');
        errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorRef.current.focus();
      }
    }
  };

  const mockLogin = async (data) => {
    console.log('Mock API called with:', data);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.email === 'john.doe@gmail.com' && data.password === 'password123') {
          resolve({ success: true, message: 'Login successful' });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="w-1/2 bg-white flex flex-col">
        <div className="pt-12 mb-12 pl-16 flex items-center">
          <img 
            src="/images/lock.svg" 
            alt="Lock Logo" 
            className="w-8 h-8" 
          />
          <div className="text-zinc-800 text-4xl font-bold font-['Red_Hat_Display'] leading-[53px] ml-3">Neo</div>
        </div>
        
        <div className="w-full pt-4 flex-1 flex flex-col pl-[108px] pr-16">
          <div className="flex flex-col w-full">
            <h1 className="text-zinc-800 text-4xl font-semibold font-['Poppins'] mb-12">
              Login
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="Business Phone Number"
                type="text"
                placeholder="09685749685"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                error={errors.phone}
                className="placeholder-muted-gray"
              />
              <InputField
                label="Business Mail id"
                type="email"
                placeholder="john.doe@gmail.com"
                value={formData.email}
                onChange={handleInputChange('email')}
                error={errors.email}
                className="placeholder-muted-gray"
              />
              <InputField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="•••••••••••••••••••••••••"
                value={formData.password}
                onChange={handleInputChange('password')}
                error={errors.password}
                className="placeholder-muted-gray"
                trailingIcon={
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="flex items-center justify-center w-6 h-6"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-zinc-800"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-zinc-800"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        <path
                          d="M2.81 3.53l1.41-1.41 16.97 16.97-1.41 1.41L2.81 3.53z"
                          fill="none"
                          stroke="white"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2.81 3.53l1.41-1.41 16.97 16.97-1.41 1.41L2.81 3.53z"
                          fill="currentColor"
                          stroke="none"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                }
              />
              <div className="flex justify-between items-center">
                <Checkbox
                  label="Remember me"
                  checked={formData.rememberMe}
                  onChange={handleCheckboxChange}
                />
                <Link to="/forgot" className="text-error-red text-sm font-medium font-['Poppins'] hover:underline">
                  Forgot Password
                </Link>
              </div>
              <PrimaryButton type="submit">Login</PrimaryButton>
              <div className="text-center">
                <span className="text-zinc-800 text-sm font-medium font-['Poppins']">Don't have an account? </span>
                <Link to="/signup" className="text-error-red text-sm font-semibold font-['Poppins'] hover:underline">
                  Sign up
                </Link>
              </div>
              <div ref={errorRef} tabIndex={-1} className="mt-2">
                {submissionMessage && (
                  <p className={`text-base text-center font-semibold font-['Poppins'] ${submissionMessage.includes('error') || submissionMessage.includes('failed') ? 'text-error-red' : 'text-indigo-500'}`}>
                    {submissionMessage}
                  </p>
                )}
                {errors.general && (
                  <p className="text-base text-center text-error-red font-semibold font-['Poppins']">{errors.general}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="w-1/2 relative">
        <div className="h-full w-full bg-zinc-300">
          <img
            src="/images/shoe1.png"
            alt="Shoes"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white text-center">
          <h2 className="text-4xl font-bold font-['Inter'] whitespace-nowrap">
            Stunning Stores For Your Brand
          </h2>
          
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-8 h-2.5 bg-indigo-500 rounded-md"></div>
            <div className="w-2.5 h-2.5 bg-zinc-300 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-zinc-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginUI;