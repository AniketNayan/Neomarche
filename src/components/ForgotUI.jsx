import { Link } from 'react-router-dom';
import { PrimaryButton, InputField } from './AuthUtils';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotUI() {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');
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

  const validateForm = () => {
    console.log('Validating form:', formData);
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    console.log('Validation errors set to:', newErrors);
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button clicked - handleSubmit triggered');
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
      console.log('Calling forgotPassword API with:', { email: formData.email });
      const response = await mockForgotPassword(formData.email);
      console.log('API response:', response);
      if (!response.success) {
        throw new Error(response.message || 'Failed to send reset link');
      }

      setSubmissionMessage('Reset link sent! Redirecting to verification page...');
      console.log('Reset link sent successfully:', response);
      setTimeout(() => {
        try {
          console.log('Attempting to navigate to /verify');
          navigate('/verify');
          console.log('Navigated to /verify');
        } catch (navError) {
          console.error('Navigation error:', navError);
          setSubmissionMessage('Error redirecting to verification page. Redirecting to login...');
          setTimeout(() => {
            navigate('/');
            console.log('Navigated to /');
          }, 1000);
        }
      }, 1000);
    } catch (error) {
      console.error('API error:', error.message);
      setErrors({ general: error.message });
      setSubmissionMessage('Failed to send reset link: ' + error.message);
      console.log('Submission message set to:', 'Failed to send reset link: ' + error.message);
      if (errorRef.current) {
        console.log('Scrolling to error message');
        errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorRef.current.focus();
      }
    }
  };

  const mockForgotPassword = async (email) => {
    console.log('Mock API called with email:', email);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'john.doe@gmail.com') {
          resolve({ success: true, message: 'Reset link sent' });
        } else {
          reject(new Error('Email not found'));
        }
      }, 500);
    });
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="w-1/2 bg-white flex flex-col">
        <div className="pt-[51px] mb-[45px] pl-16 flex items-center">
          <img 
            src="/images/lock.svg" 
            alt="Lock Logo" 
            className="w-8 h-8" 
          />
          <div className="text-zinc-800 text-4xl font-bold font-['Red_Hat_Display'] leading-[53px] ml-3">Neo</div>
        </div>
        
        <div className="w-full pt-[38px] flex-1 flex flex-col pl-[108px] pr-16">
          <div className="flex flex-col w-full">
            <div className="flex flex-col justify-start items-start gap-4 mb-12">
              <div className="inline-flex justify-start items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-zinc-800"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                <Link to="/" className="text-zinc-800 text-sm font-medium font-['Poppins'] hover:underline">
                  Back to login
                </Link>
              </div>
              <div className="w-[512px] flex flex-col justify-start items-start gap-4">
                <div className="self-stretch justify-start text-zinc-800 text-4xl font-semibold font-['Poppins']">
                  Forgot your password?
                </div>
                <div className="self-stretch opacity-75 justify-start text-zinc-800 text-base font-normal font-['Poppins']">
                  Don’t worry, happens to all of us. Enter your email below to recover your password
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="Business Email"
                type="email"
                placeholder="john.doe@gmail.com"
                value={formData.email}
                onChange={handleInputChange('email')}
                error={errors.email}
                className="w-full h-14 placeholder-muted-gray"
              />
              <PrimaryButton type="submit">Submit</PrimaryButton>
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
            src="/images/fas1.png"
            alt="fashion background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default ForgotUI;