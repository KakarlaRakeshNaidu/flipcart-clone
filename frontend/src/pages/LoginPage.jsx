import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [name, setName] = useState('');
  
  // authMode determines the UI text before OTP is sent
  const [authMode, setAuthMode] = useState('LOGIN'); // 'LOGIN' | 'SIGNUP'
  // Steps: 'ENTER_EMAIL' | 'VERIFY_OTP' | 'ENTER_NAME'
  const [step, setStep] = useState('ENTER_EMAIL');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signupToken, setSignupToken] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_BASE}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      if (data.success) {
        setStep('VERIFY_OTP');
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_BASE}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otpCode })
      });
      
      const data = await response.json();
      if (data.success) {
        if (data.isNewUser) {
          setSignupToken(data.signupToken);
          setStep('ENTER_NAME');
        } else {
          login(data.user, data.token);
          navigate(location.state?.from || '/');
        }
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name) {
      setError('Please enter your name');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signupToken, name })
      });
      
      const data = await response.json();
      if (data.success) {
        login(data.user, data.token);
        navigate(location.state?.from || '/');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  return (
    <div className="bg-[#F1F3F6] min-h-[calc(100vh-130px)] py-8 flex items-center justify-center">
      <div className="bg-white shadow-sm flex rounded-sm overflow-hidden w-full max-w-[850px] min-h-[520px]">
        
        {/* Left Blue Panel */}
        <div className="w-[40%] bg-[#2874f0] p-10 flex flex-col justify-between text-white relative">
          <div>
            <h1 className="text-[28px] font-medium mb-4">
              {step === 'ENTER_NAME' || authMode === 'SIGNUP' 
                ? "Looks like you're new here!" 
                : "Login"}
            </h1>
            <p className="text-[18px] text-[#dbdbdb] leading-relaxed pr-4">
              {step === 'ENTER_NAME' || authMode === 'SIGNUP' 
                ? "Sign up with your mobile number to get started" 
                : "Get access to your Orders, Wishlist and Recommendations"}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-full flex justify-center">
            <img 
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" 
              alt="Login illustration" 
              className="w-full object-contain"
            />
          </div>
        </div>

        {/* Right White Panel */}
        <div className="w-[60%] p-12 relative flex flex-col justify-between">
          <div>
            {error && (
              <div className="text-[#ff6161] text-[12px] mb-4 bg-[#ffebe6] p-2 rounded-sm border border-[#ff6161]">
                {error}
              </div>
            )}
            
            {step === 'ENTER_EMAIL' && (
              <form onSubmit={handleSendOtp} className="flex flex-col gap-6">
                <div className="relative pt-4">
                  <input 
                    type="email" 
                    required
                    className="w-full border-b border-[#e0e0e0] py-2 text-[16px] outline-none focus:border-[#2874F0] peer placeholder-transparent bg-transparent" 
                    placeholder="Enter Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                  />
                  <label htmlFor="email" className="absolute left-0 -top-1 text-[12px] text-[#878787] transition-all peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-6 peer-focus:-top-1 peer-focus:text-[12px] peer-focus:text-[#2874F0]">
                    Enter Email/Mobile number
                  </label>
                </div>
                
                <p className="text-[12px] text-[#878787] mt-4">
                  By continuing, you agree to Flipkart's <span className="text-[#2874F0] cursor-pointer">Terms of Use</span> and <span className="text-[#2874F0] cursor-pointer">Privacy Policy</span>.
                </p>
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#fb641b] text-white py-3 rounded-sm font-medium text-[15px] mt-2 shadow-sm disabled:opacity-70"
                >
                  {loading ? 'Processing...' : (authMode === 'SIGNUP' ? 'CONTINUE' : 'Request OTP')}
                </button>

                {authMode === 'SIGNUP' && (
                  <button 
                    type="button" 
                    onClick={() => setAuthMode('LOGIN')}
                    className="w-full bg-white text-[#2874F0] border border-[#e0e0e0] py-3 rounded-sm font-medium text-[15px] shadow-sm hover:shadow-md transition-shadow"
                  >
                    Existing User? Log in
                  </button>
                )}
              </form>
            )}

            {step === 'VERIFY_OTP' && (
              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-6">
                <div className="text-center mb-6">
                  <p className="text-[14px] text-[#212121]">Please enter the OTP sent to</p>
                  <p className="text-[14px] font-medium text-[#212121]">
                    {email}. <span className="text-[#2874F0] cursor-pointer" onClick={() => setStep('ENTER_EMAIL')}>Change</span>
                  </p>
                </div>

                <div className="flex justify-center gap-4 mb-8">
                  {otp.map((data, index) => {
                    return (
                      <input
                        className="w-[40px] h-[40px] border-b-2 border-[#e0e0e0] focus:border-[#2874F0] text-center text-[20px] outline-none bg-transparent"
                        type="text"
                        name="otp"
                        maxLength="1"
                        key={index}
                        value={data}
                        onChange={e => handleOtpChange(e.target, index)}
                        onFocus={e => e.target.select()}
                      />
                    );
                  })}
                </div>
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#2874F0] text-white py-3 rounded-sm font-medium text-[15px] shadow-sm disabled:opacity-70"
                >
                  {loading ? 'Verifying...' : 'Verify'}
                </button>
              </form>
            )}

            {step === 'ENTER_NAME' && (
              <form onSubmit={handleRegister} className="flex flex-col gap-6">
                <div className="relative pt-4">
                  <input 
                    type="text" 
                    required
                    className="w-full border-b border-[#e0e0e0] py-2 text-[16px] outline-none focus:border-[#2874F0] peer placeholder-transparent bg-transparent" 
                    placeholder="Enter your Full Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                  />
                  <label htmlFor="name" className="absolute left-0 -top-1 text-[12px] text-[#878787] transition-all peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-6 peer-focus:-top-1 peer-focus:text-[12px] peer-focus:text-[#2874F0]">
                    Enter your Full Name
                  </label>
                </div>
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#fb641b] text-white py-3 rounded-sm font-medium text-[15px] mt-6 shadow-sm disabled:opacity-70"
                >
                  {loading ? 'Creating Account...' : 'CONTINUE'}
                </button>
              </form>
            )}
          </div>

          {/* Bottom text */}
          {step === 'ENTER_EMAIL' && authMode === 'LOGIN' && (
            <div className="text-center mt-auto">
              <span className="text-[#2874F0] font-medium cursor-pointer text-[14px]" onClick={() => setAuthMode('SIGNUP')}>
                New to Flipkart? Create an account
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
