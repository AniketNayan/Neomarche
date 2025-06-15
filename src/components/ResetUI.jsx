import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PrimaryButton, InputField } from './AuthUtils';

function ResetUI() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field) => (e) => {
    console.log(`Input changed for ${field}:`, e.target.value);
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
    setSubmissionMessage('');
  };

  const togglePasswordVisibility = (field) => () => {
    if (field === 'password') {
      console.log('Toggling password visibility:', !showPassword);
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      console.log('Toggling confirm password visibility:', !showConfirmPassword);
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const validateForm = () => {
    console.log('Validating form:', formData);
    const newErrors = {};
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    console.log('Validation errors:', newErrors);
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button triggered');
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmissionMessage('Please enter valid password details.');
      console.log('Submission blocked due to errors:', validationErrors);
      return;
    }

    try {
      console.log('Calling resetPassword API with password:', formData.password);
      const response = await mockResetPassword(formData.password);
      if (!response.success) {
        throw new Error(response.message || 'Failed to reset password');
      }

      setSubmissionMessage('Password reset successfully! Redirecting to login...');
      console.log('API call successful:', response);
      setTimeout(() => {
        try {
          navigate('/');
          console.log('Navigated to /');
        } catch (navError) {
          console.error('Navigation error:', navError);
          setSubmissionMessage('Error redirecting. Please try again.');
        }
      }, 1000);
    } catch (error) {
      console.error('API error:', error.message);
      setErrors({ general: error.message });
      setSubmissionMessage('Password reset failed. Please try again.');
    }
  };

  const mockResetPassword = async (password) => {
    console.log('Mock API called with password:', password);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password.length >= 8) {
          resolve({ success: true, message: 'Password reset' });
        } else {
          reject(new Error('Password reset failed'));
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
            <div className="flex flex-col gap-4 mb-12">
              <h1 className="text-zinc-800 text-4xl font-semibold font-['Poppins']">
                Set a password
              </h1>
              <p className="text-base text-zinc-800 opacity-75 font-normal font-['Poppins']">
                Your previous password has been reset. Please set a new password for your account.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="Create Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange('password')}
                error={errors.password}
                className="w-full h-14 placeholder-muted-gray"
                trailingIcon={
                  <button
                    type="button"
                    onClick={togglePasswordVisibility('password')}
                    className="flex items-center justify-center w-12 h-12 p-3"
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
              <InputField
                label="Re-enter Password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                error={errors.confirmPassword}
                className="w-full h-14 placeholder-muted-gray"
                trailingIcon={
                  <button
                    type="button"
                    onClick={togglePasswordVisibility('confirmPassword')}
                    className="flex items-center justify-center w-12 h-12 p-3"
                  >
                    {showConfirmPassword ? (
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
              <PrimaryButton type="submit">Set password</PrimaryButton>
              {submissionMessage && (
                <p className={`text-sm text-center ${submissionMessage.includes('error') || submissionMessage.includes('failed') ? 'text-error-red' : 'text-indigo-500'}`}>
                  {submissionMessage}
                </p>
              )}
              {errors.general && (
                <p className="text-sm text-center text-error-red">{errors.general}</p>
              )}
            </form>
          </div>
        </div>
      </div>
      
      {/* Right Side - Gradient Rectangle with Overlay Image */}
      <div className="lg:w-1/2 w-full h-[30vh] lg:h-full fixed right-0 top-0 z-0 overflow-hidden bg-gradient-to-b from-red-200 to-sky-600">
        <div className="relative w-full h-full flex items-start justify-start">
          <img
            src="/images/shoe3.png"
            alt="Shoe Overlay"
            className="w-[728px] h-[728px] absolute left-0 top-[148px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default ResetUI;