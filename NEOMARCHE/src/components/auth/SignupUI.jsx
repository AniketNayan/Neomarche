import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PasswordInput, Spinner, validateEmail, validatePhone, validateCountryCode, validatePassword, handleEnterKey } from '../../utils/AuthUtils';

const SignupUI = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  // Slider logic
  const nextSlide = () => setActiveSlide((prev) => (prev === 2 ? 0 : prev + 1));
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);
  const slidesContent = [
    { image: '/images/shoe1.png', title: 'Stunning Stores For Your Brand' },
    { image: '/images/shoe2.png', title: 'Seamless User Experience' },
    { image: '/images/fas1.png', title: 'Seamless Buying Experience' }
  ];

  // Signup logic
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupCountryCode, setSignupCountryCode] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const signupFirstNameRef = useRef(null);
  const signupLastNameRef = useRef(null);
  const signupEmailRef = useRef(null);
  const signupCountryCodeRef = useRef(null);
  const signupPhoneRef = useRef(null);
  const signupPasswordRef = useRef(null);
  const signupConfirmPasswordRef = useRef(null);
  const signupTermsRef = useRef(null);
  const signupButtonRef = useRef(null);

  useEffect(() => {
    setFirstName('');
    setLastName('');
    setSignupEmail('');
    setSignupCountryCode('');
    setSignupPhone('');
    setSignupPassword('');
    setConfirmPassword('');
    setAgreeTerms(false);
    setErrors({});
    setSuccessMessage('');
    setTimeout(() => signupFirstNameRef.current?.focus(), 0);
  }, []);

  const handleSignup = async () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = 'First name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    if (!signupEmail) newErrors.signupEmail = 'Email is required';
    else if (!validateEmail(signupEmail)) newErrors.signupEmail = 'Please enter a valid email address';
    if (!signupCountryCode) newErrors.signupCountryCode = 'Country code is required';
    else if (!validateCountryCode(signupCountryCode)) newErrors.signupCountryCode = 'Invalid country code';
    if (!signupPhone) newErrors.signupPhone = 'Phone number is required';
    else if (!validatePhone(signupPhone)) newErrors.signupPhone = 'Invalid phone number';
    if (!signupPassword) newErrors.signupPassword = 'Password is required';
    else if (!validatePassword(signupPassword)) newErrors.signupPassword = 'Password must be at least 8 characters';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    else if (signupPassword !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockResponse = { success: true };
        if (!mockResponse.success) {
          throw new Error('Signup failed');
        }
        setSuccessMessage('Signup successful! Redirecting to login...');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/login');
        }, 2000);
      } catch (error) {
        setErrors({ signupGeneral: error.message || 'Signup failed' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const brandName = "NeoMarche";

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      {/* Left Side: Form */}
      <div className="w-full md:w-1/2 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        <div className="p-6 md:p-12">
          <div className="mb-8">
            <div className="flex items-center">
              <div className="text-indigo-600 mr-2">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C21.523 26 26 21.523 26 16C26 10.477 21.523 6 16 6ZM16 24C11.582 24 8 20.418 8 16C8 11.582 11.582 8 16 8C20.418 8 24 11.582 24 16C24 20.418 20.418 24 16 24Z" fill="#4F46E5" />
                  <path d="M16 12C13.791 12 12 13.791 12 16C12 18.209 13.791 20 16 20C18.209 20 20 18.209 20 16C20 13.791 18.209 12 16 12Z" fill="#4F46E5" />
                  <path d="M16 0C12.318 0 9.318 2.95 9.318 6.591C9.318 7.141 9.768 7.591 10.318 7.591C10.868 7.591 11.318 7.141 11.318 6.591C11.318 4.054 13.409 2 16 2C18.591 2 20.682 4.054 20.682 6.591C20.682 7.141 21.132 7.591 21.682 7.591C22.232 7.591 22.682 7.141 22.682 6.591C22.682 2.95 19.682 0 16 0Z" fill="#4F46E5" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{brandName}</h2>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Sign up</h1>
            <p className="text-gray-600 mb-8">Let's get you all set up so you can access your personal account.</p>
            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-600">{successMessage}</p>
              </div>
            )}
            {errors.signupGeneral && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-500">{errors.signupGeneral}</p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  ref={signupFirstNameRef}
                  id="firstName"
                  type="text"
                  className={`w-full px-4 py-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setErrors(prev => ({ ...prev, firstName: null, signupGeneral: null }));
                  }}
                  onKeyDown={(e) => handleEnterKey(e, signupLastNameRef)}
                  autoComplete="given-name"
                  aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                />
                {errors.firstName && (
                  <p id="firstName-error" className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  ref={signupLastNameRef}
                  id="lastName"
                  type="text"
                  className={`w-full px-4 py-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setErrors(prev => ({ ...prev, lastName: null, signupGeneral: null }));
                  }}
                  onKeyDown={(e) => handleEnterKey(e, signupEmailRef)}
                  autoComplete="family-name"
                  aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                />
                {errors.lastName && (
                  <p id="lastName-error" className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="signupEmail" className="block text-sm font-medium text-gray-700 mb-1">Business Email</label>
              <input
                ref={signupEmailRef}
                id="signupEmail"
                type="email"
                className={`w-full px-4 py-3 border ${errors.signupEmail ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="john.doe@gmail.com"
                value={signupEmail}
                onChange={(e) => {
                  setSignupEmail(e.target.value);
                  setErrors(prev => ({ ...prev, signupEmail: null, signupGeneral: null }));
                }}
                onKeyDown={(e) => handleEnterKey(e, signupCountryCodeRef)}
                autoComplete="email"
                aria-describedby={errors.signupEmail ? 'signupEmail-error' : undefined}
              />
              {errors.signupEmail && (
                <p id="signupEmail-error" className="mt-1 text-sm text-red-500">{errors.signupEmail}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Phone Number</label>
              <div className="flex space-x-2">
                <div className="w-1/4">
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-500">+</span>
                    <input
                      ref={signupCountryCodeRef}
                      type="tel"
                      className={`w-full pl-6 pr-3 py-3 border ${errors.signupCountryCode ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      placeholder="91"
                      value={signupCountryCode}
                      onChange={(e) => {
                        const value = e.target.value;
                        if ((/^\d*$/.test(value) || value === '') && value.length <= 4) {
                          setSignupCountryCode(value);
                          setErrors(prev => ({ ...prev, signupCountryCode: null, signupGeneral: null }));
                        }
                      }}
                      onKeyDown={(e) => handleEnterKey(e, signupPhoneRef)}
                      autoComplete="tel-country-code"
                      aria-describedby={errors.signupCountryCode ? 'signupCountryCode-error' : undefined}
                    />
                  </div>
                  {errors.signupCountryCode && (
                    <p id="signupCountryCode-error" className="mt-1 text-sm text-red-500">{errors.signupCountryCode}</p>
                  )}
                </div>
                <div className="w-3/4">
                  <input
                    ref={signupPhoneRef}
                    type="tel"
                    className={`w-full px-4 py-3 border ${errors.signupPhone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    placeholder="9876543210"
                    value={signupPhone}
                    onChange={(e) => {
                      const value = e.target.value;
                      if ((/^\d*$/.test(value) || value === '') && value.length <= 15) {
                        setSignupPhone(value);
                        setErrors(prev => ({ ...prev, signupPhone: null, signupGeneral: null }));
                      }
                    }}
                    onKeyDown={(e) => handleEnterKey(e, signupPasswordRef)}
                    autoComplete="tel-national"
                    aria-describedby={errors.signupPhone ? 'signupPhone-error' : undefined}
                  />
                  {errors.signupPhone && (
                    <p id="signupPhone-error" className="mt-1 text-sm text-red-500">{errors.signupPhone}</p>
                  )}
                </div>
              </div>
            </div>
            <PasswordInput
              id="signupPassword"
              label="Password"
              value={signupPassword}
              onChange={(e) => {
                setSignupPassword(e.target.value);
                setErrors(prev => ({ ...prev, signupPassword: null, signupGeneral: null }));
              }}
              error={errors.signupPassword}
              showPassword={showSignupPassword}
              setShowPassword={setShowSignupPassword}
              placeholder="Enter your password"
              onKeyDown={(e) => handleEnterKey(e, signupConfirmPasswordRef)}
              inputRef={signupPasswordRef}
              autoComplete="new-password"
            />
            <PasswordInput
              id="confirmPassword"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors(prev => ({ ...prev, confirmPassword: null, signupGeneral: null }));
              }}
              error={errors.confirmPassword}
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
              placeholder="Confirm your password"
              onKeyDown={(e) => handleEnterKey(e, signupTermsRef)}
              inputRef={signupConfirmPasswordRef}
              autoComplete="new-password"
            />
            <div className="flex items-center mb-6">
              <input
                ref={signupTermsRef}
                type="checkbox"
                id="terms"
                className={`h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 ${errors.agreeTerms ? 'border-red-500' : ''}`}
                checked={agreeTerms}
                onChange={(e) => {
                  setAgreeTerms(e.target.checked);
                  setErrors(prev => ({ ...prev, agreeTerms: null, signupGeneral: null }));
                }}
                onKeyDown={(e) => handleEnterKey(e, signupButtonRef)}
                aria-describedby={errors.agreeTerms ? 'terms-error' : undefined}
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I agree to all the <span className="text-rose-500">Terms</span> and <span className="text-rose-500">Privacy Policies</span>
              </label>
            </div>
            {errors.agreeTerms && (
              <p id="terms-error" className="mb-4 text-sm text-red-500">{errors.agreeTerms}</p>
            )}
            <button
              ref={signupButtonRef}
              type="button"
              className={`w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mb-4 flex justify-center items-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleSignup}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : 'Create account'}
            </button>
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-rose-500 hover:text-rose-600"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Right Side: Slider */}
      <div className="hidden md:block w-full md:w-1/2 h-64 md:h-screen bg-gray-900 relative">
        <div role="tablist" className="h-full" aria-label="Promotional slides">
          {slidesContent.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex flex-col transition-opacity duration-700 ${activeSlide === index ? 'opacity-100' : 'opacity-0'}`}
              aria-hidden={activeSlide !== index}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="relative z-10 mt-auto mb-12 text-center">
                <h3 className="text-white text-2xl font-bold">{slide.title}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
          {slidesContent.map((_, index) => (
            <button
              key={index}
              className={`h-1 rounded-full transition-all ${activeSlide === index ? 'bg-indigo-600 w-6' : 'bg-gray-500 w-1'}`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignupUI;