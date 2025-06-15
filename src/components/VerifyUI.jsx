import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PrimaryButton, InputField } from './AuthUtils';

function VerifyUI() {
  const [formData, setFormData] = useState({ code: '' });
  const [errors, setErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    console.log('Input changed:', e.target.value);
    const newCode = e.target.value.toUpperCase();
    setFormData({ ...formData, code: newCode });
    if (errors.code) {
      setErrors({ ...errors, code: '' });
    }
    setSubmissionMessage('');
  };

  const validateForm = () => {
    console.log('Validating form:', formData.code);
    const newErrors = {};
    if (!formData.code) {
      newErrors.code = 'Verification code is required';
    } else if (formData.code.length < 6) {
      newErrors.code = 'Code must be at least 6 characters';
    } else if (!/^[0-9A-Z]{6,}$/.test(formData.code)) {
      newErrors.code = 'Code must be alphanumeric';
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
      setSubmissionMessage('Please enter a valid verification code.');
      console.log('Submission blocked due to errors:', validationErrors);
      return;
    }

    try {
      console.log('Simulating API call for code:', formData.code);
      const response = await mockVerifyCode(formData.code);
      if (!response.success) {
        throw new Error(response.message || 'Invalid verification code');
      }

      setSubmissionMessage('Code verified successfully! Redirecting...');
      console.log('API call successful:', response);
      setTimeout(() => {
        try {
          navigate('/reset');
          console.log('Navigated to /reset');
        } catch (navError) {
          console.error('Navigation error:', navError);
          setSubmissionMessage('Error redirecting. Please try again.');
        }
      }, 1000);
    } catch (error) {
      console.error('API error:', error.message);
      setErrors({ code: error.message });
      setSubmissionMessage('Verification failed. Please check the code and try again.');
    }
  };

  const mockVerifyCode = (code) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (code === '123456') {
          resolve({ success: true, message: 'Code verified' });
        } else {
          reject({ success: false, message: 'Invalid or expired code' });
        }
      }, 500);
    });
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="lg:w-1/2 w-full flex flex-col">
        <div className="pt-12 mb-12 pl-16 flex items-center">
          <img 
            src="/images/lock.svg" 
            alt="Lock Logo" 
            className="w-8 h-8" 
          />
          <div className="text-zinc-800 text-4xl font-bold font-['Red_Hat_Display'] leading-[53px] ml-3">Neo</div>
        </div>
        <div className="w-full pt-4 flex-1 flex flex-col pl-[108px] pr-16">
          <div className="flex flex-col w-full space-y-12">
            <div className="flex flex-col space-y-2">
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
              <h1 className="text-zinc-800 text-4xl font-semibold font-['Poppins']">
                Verify code
              </h1>
              <p className="text-base text-muted-gray opacity-75">
                An authentication code has been sent to your email.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <InputField
                label="Enter Code"
                type="text"
                placeholder="7789BM6X"
                value={formData.code}
                onChange={handleInputChange}
                error={errors.code}
                className="w-full h-14 placeholder-muted-gray uppercase"
              />
              <div className="text-left">
                <span className="text-zinc-800 text-sm font-medium font-['Poppins']">Didn’t receive a code? </span>
                <Link to="/forgot" className="text-rose-400 text-sm font-semibold font-['Poppins'] hover:underline">
                  Resend
                </Link>
              </div>
              <PrimaryButton type="submit">Verify</PrimaryButton>
              {submissionMessage && (
                <p className={`text-sm text-left ${submissionMessage.includes('error') || submissionMessage.includes('failed') ? 'text-error-red' : 'text-indigo-500'}`}>
                  {submissionMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 w-full h-[30vh] lg:h-full fixed right-0 top-0 z-0 overflow-hidden">
        <div className="h-full w-full bg-zinc-300">
          <img
            src="/images/shoe1.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default VerifyUI;