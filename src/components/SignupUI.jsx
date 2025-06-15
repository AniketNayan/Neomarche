import { Link } from 'react-router-dom';
import { PrimaryButton, InputField, Checkbox } from './AuthUtils';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupUI() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    const newAgreeTerms = !formData.agreeTerms;
    console.log('Checkbox toggled to:', newAgreeTerms);
    setFormData({ ...formData, agreeTerms: newAgreeTerms });
    if (errors.agreeTerms) {
      setErrors({ ...errors, agreeTerms: '' });
    }
  };

  const togglePasswordVisibility = (field) => () => {
    if (field === 'password') {
      setShowPassword(!showPassword);
      console.log('Toggled showPassword to:', !showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
      console.log('Toggled showConfirmPassword to:', !showConfirmPassword);
    }
  };

  const validateForm = () => {
    console.log('Validating form:', formData);
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number (10 digits required)';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the Terms and Privacy Policies';
    console.log('Validation errors set to:', newErrors);
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Create account button clicked - handleSubmit triggered');
    const validationErrors = validateForm();
    setErrors(validationErrors);
    console.log('Errors state after setErrors:', validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setSubmissionMessage('Please fill all fields correctly.');
      console.log('Validation failed, errors displayed');
      if (errorRef.current) {
        console.log('Scrolling to error message area');
        errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorRef.current.focus();
      }
      return;
    }

    try {
      console.log('Calling signup API with:', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      const response = await mockSignup(formData);
      console.log('API response:', response);
      if (!response.success) {
        throw new Error(response.message || 'Signup failed');
      }

      setSubmissionMessage('Account created successfully! Redirecting...');
      console.log('Account creation successful:', response);
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
      setSubmissionMessage('Signup failed: ' + error.message);
      console.log('Submission message set to:', 'Signup failed: ' + error.message);
      if (errorRef.current) {
        console.log('Scrolling to error message');
        errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorRef.current.focus();
      }
    }
  };

  const mockSignup = async (data) => {
    console.log('Mock API called with:', data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Signup successful' });
      }, 500);
    });
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="w-1/2 relative">
        <div className="h-full w-full bg-zinc-300">
          <img
            src="/images/shoe2.png"
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
      
      <div className="w-1/2 bg-white flex flex-col relative">
        <div className="absolute right-16 top-[51px] flex items-center">
          <img 
            src="/images/lock.svg" 
            alt="Lock Logo" 
            className="w-[77px] h-[53px]" 
          />
          <div className="text-zinc-800 text-4xl font-bold font-['Red_Hat_Display'] leading-[53px] ml-3">Neo</div>
        </div>

        <div className="w-full pt-[150px] flex-1 flex flex-col pl-[108px] pr-16">
          <div className="flex flex-col w-full">
            <div className="flex flex-col justify-start items-start gap-4 mb-12">
              <div className="w-[512px] flex flex-col justify-start items-start gap-4">
                <div className="self-stretch justify-start text-zinc-800 text-4xl font-semibold font-['Poppins']">
                  Sign up
                </div>
                <div className="self-stretch justify-start text-zinc-800 text-base font-normal font-['Poppins'] opacity-75 whitespace-nowrap">
                  Let's get you all set up so you can access your personal account.
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                <InputField
                  label="First Name"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleInputChange('firstName')}
                  error={errors.firstName}
                  className="flex-1 h-14 placeholder-muted-gray"
                />
                <InputField
                  label="Last Name"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange('lastName')}
                  error={errors.lastName}
                  className="flex-1 h-14 placeholder-muted-gray"
                />
              </div>
              <div className="flex gap-2">
                <InputField
                  label="Business Email"
                  type="email"
                  placeholder="john.doe@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  error={errors.email}
                  className="flex-1 h-14 placeholder-muted-gray"
                />
                <InputField
                  label="Business Phone Number"
                  type="tel"
                  placeholder="09685749685"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  error={errors.phone}
                  className="flex-1 h-14 placeholder-muted-gray"
                />
              </div>
              <InputField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="•••••••••••••••••••••••••"
                value={formData.password}
                onChange={handleInputChange('password')}
                error={errors.password}
                className="h-14 placeholder-muted-gray"
                trailingIcon={
                  <button
                    type="button"
                    onClick={togglePasswordVisibility('password')}
                    className="flex items-center justify-center w-6 h-6"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-zinc-800"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-5-1.34-3-3-3z" />
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
                          strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <path
                          d="M2.81 3.53l1.41-1.41 16.97 16.97-1.41 1.41L2.81 3.53z"
                          fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                }
              />
              <InputField
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                error={errors.confirmPassword}
                className="h-14 placeholder-muted-gray"
                trailingIcon={
                  <button
                    type="button"
                    onClick={togglePasswordVisibility('confirmPassword')}
                    className="flex items-center justify-center w-6 h-6">
                    {showConfirmPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-zinc-800"
                        viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                          d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-zinc-800"
                        viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                          d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        <path
                          d="M2.81 3.53l1.41-1.41 16.97 16.97-1.41 1.41L2.81 3.53z"
                          fill="none"
                          stroke="white"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round" />
                        <path
                          d="M2.81 3.53l1.41-1.41 16.97 16.97-1.41 1.41L2.81 3.53z"
                          fill="currentColor"
                          stroke="none"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                }
              />
              <div className="flex items-center">
                <Checkbox
                  label={
                    <>
                      I agree to all the <span className="text-rose-400 font-semibold">Terms</span> and{' '}
                      <span className="text-rose-400 font-semibold">Privacy Policies</span>
                    </>
                  }
                  checked={formData.agreeTerms}
                  onChange={handleCheckboxChange}
                />
                {errors.agreeTerms && <p className="text-rose-400 text-sm mt-1 font-medium font-['Poppins']">{errors.agreeTerms}</p>}
              </div>
              <PrimaryButton type="submit">Create account</PrimaryButton>
              <div className="text-center">
                <span className="text-zinc-800 text-sm font-medium font-['Poppins']">Already have an account? </span>
                <Link to="/" className="text-rose-400 text-sm font-semibold font-['Poppins'] hover:underline">
                  Login
                </Link>
              </div>
              <div ref={errorRef} tabIndex={-1} className="mt-2">
                {submissionMessage && (
                  <p
                    className={`text-base text-center font-semibold font-['Poppins'] ${submissionMessage.includes('error') || submissionMessage.includes('failed') ? 'text-rose-400' : 'text-indigo-500'}`}>
                    {submissionMessage}
                  </p>
                )}
                {errors.general && (
                  <p className="text-base text-center text-rose-400 font-semibold font-['Poppins']">{errors.general}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupUI;