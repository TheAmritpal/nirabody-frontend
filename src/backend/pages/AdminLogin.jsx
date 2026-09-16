
// src/components/admin/AdminLogin.jsx
import React, { useState, useRef, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiRefreshCw } from 'react-icons/fi';

// Import context
import { AdminAuthContext } from '../context/AdminAuth';
import { apiUrl } from './https';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useContext(AdminAuthContext);

  // ── Shared ────────────────────────────────────────────────
  const [step, setStep] = useState('login'); // 'login' | 'otp'
  const [loading, setLoading] = useState(false);

  // ── Login Form ────────────────────────────────────────────
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginErrors, setLoginErrors] = useState({});

  // ── OTP Form ──────────────────────────────────────────────
  const [userId, setUserId] = useState(null);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(300); // 5 min
  const otpInputs = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (step !== 'otp' || otpTimer <= 0) return;
    const id = setInterval(() => setOtpTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [step, otpTimer]);

  const formatTimer = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // ── Login Handlers ────────────────────────────────────────
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    setLoginErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateLogin = () => {
    const errs = {};
    if (!loginData.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(loginData.email)) errs.email = 'Invalid email';
    if (!loginData.password) errs.password = 'Password is required';
    else if (loginData.password.length < 6) errs.password = 'Min 6 characters';
    return errs;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = validateLogin();
    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.msg || 'Login failed');
      }

      setUserId(data.user_id);
      setStep('otp');
      setOtpTimer(300);
      toast.success('OTP sent to your email', { autoClose: 4000 });
    } catch (err) {
      toast.error(err.message || 'Something went wrong', { autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  // ── OTP Handlers ──────────────────────────────────────────
  const handleOtpChange = (idx, val) => {
    if (val && !/^\d$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);

    if (val && idx < 3) {
      otpInputs.current[idx + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpInputs.current[idx - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text').replace(/\D/g, '');
    if (!text) return;

    const digits = text.slice(0, 4).split('');
    setOtp((prev) => {
      const next = [...prev];
      digits.forEach((d, i) => { if (i < 4) next[i] = d; });
      return next;
    });

    const nextFocus = Math.min(digits.length, 3);
    otpInputs.current[nextFocus]?.focus();
  };

  const handleVerifyOtp = async () => {
    const code = otp.join('');
    if (code.length !== 4) {
      toast.warning('Please enter 4-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/admin/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, otp: code }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Invalid OTP');

      toast.success('Login successful! Redirecting...', { autoClose: 2000 });

      login({
        token: data.token,
        id: data.id,
        name: data.name
      });

      setTimeout(() => navigate('/backend/dashboard'), 1500);
    } catch (err) {
      toast.error(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (otpTimer > 240) {
      toast.info('Please wait a bit before resending', { autoClose: 3000 });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/admin/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Resend failed');

      setOtpTimer(300);
      setOtp(['', '', '', '']);
      toast.success('New OTP sent!');
      otpInputs.current[0]?.focus();
    } catch (err) {
      toast.error(err.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  // ── Animation Variants ────────────────────────────────────
  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
  };

  const formVariants = {
    initial: { opacity: 0, x: -15 },
    animate: { opacity: 1, x: 0, transition: { delay: 0.1, duration: 0.3 } },
    exit: { opacity: 0, x: 15, transition: { duration: 0.2 } },
  };

  return (
    <>
      <ToastContainer position="top-center" theme="dark" limit={3} />

      <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950">
        {/* Background orbs - Smaller */}
        <div className="absolute rounded-full -left-20 -top-20 w-80 h-80 bg-purple-600/20 blur-3xl animate-pulse-slow" />
        <div className="absolute delay-1000 rounded-full -right-20 bottom-10 w-80 h-80 bg-pink-600/20 blur-3xl animate-pulse-slow" />

        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          className="z-10 w-full max-w-md"
        >
          {/* Header / Branding - Smaller */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 shadow-md rounded-xl bg-gradient-to-br from-purple-600 to-pink-600">
              <span className="text-2xl font-black text-white">A</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {step === 'login' ? 'Admin Portal' : 'Verify OTP'}
            </h1>
            <p className="mt-2 text-xs text-gray-400 sm:text-sm">
              {step === 'login'
                ? 'Sign in to access the dashboard'
                : `Code sent to you email`}
            </p>
          </div>

          {/* Glass card - Smaller */}
          <div className="p-6 border shadow-xl bg-white/5 backdrop-blur-2xl border-white/10 rounded-2xl md:p-8">
            <AnimatePresence mode="wait">
              {step === 'login' ? (
                <motion.form
                  key="login"
                  variants={formVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  onSubmit={handleLogin}
                  className="space-y-5"
                >
                  {/* Email */}
                  <div>
                    <label className="block mb-1.5 text-xs font-medium text-gray-300">
                      Email
                    </label>
                    <div className="relative">
                      <FiMail className="absolute text-gray-400 -translate-y-1/2 left-3.5 top-1/2 w-4 h-4" />
                      <input
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        placeholder="admin@company.com"
                        className={`w-full pl-10 pr-3 py-2.5 bg-white/5 border ${
                          loginErrors.email ? 'border-red-500' : 'border-white/15'
                        } rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all`}
                        disabled={loading}
                      />
                    </div>
                    {loginErrors.email && (
                      <p className="mt-1 text-xs text-red-400">{loginErrors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block mb-1.5 text-xs font-medium text-gray-300">
                      Password
                    </label>
                    <div className="relative">
                      <FiLock className="absolute text-gray-400 -translate-y-1/2 left-3.5 top-1/2 w-4 h-4" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        placeholder="••••••••"
                        className={`w-full pl-10 pr-10 py-2.5 bg-white/5 border ${
                          loginErrors.password ? 'border-red-500' : 'border-white/15'
                        } rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all`}
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute text-gray-400 transition -translate-y-1/2 right-3 top-1/2 hover:text-white"
                        disabled={loading}
                      >
                        {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                      </button>
                    </div>
                    {loginErrors.password && (
                      <p className="mt-1 text-xs text-red-400">{loginErrors.password}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm rounded-lg shadow-md hover:brightness-110 focus:ring-1 focus:ring-purple-500/50 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                  >
                    {loading ? (
                      'Signing in...'
                    ) : (
                      <>
                        Sign In <FiArrowRight className="text-base" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="otp"
                  variants={formVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="text-center">
                    <label className="block mb-4 text-sm font-medium text-gray-200">
                      Enter 4-digit code
                    </label>

                    <div className="flex justify-center gap-3">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          ref={(el) => (otpInputs.current[i] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          onPaste={i === 0 ? handleOtpPaste : undefined}
                          autoFocus={i === 0}
                          disabled={loading}
                          className="w-12 h-12 text-2xl font-bold text-center text-white transition-all border-2 rounded-lg outline-none bg-white/5 border-white/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/40 disabled:opacity-50"
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-gray-400">
                      {formatTimer(otpTimer)}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleVerifyOtp}
                      disabled={loading || otp.join('').length !== 4}
                      className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm rounded-lg shadow-md hover:brightness-110 focus:ring-1 focus:ring-purple-500/50 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Verifying...' : 'Verify & Login'}
                    </button>

                    <button
                      onClick={handleResendOtp}
                      disabled={loading || otpTimer > 240}
                      className="flex items-center justify-center gap-1.5 text-xs font-medium text-purple-400 transition hover:text-purple-300 disabled:opacity-50"
                    >
                      <FiRefreshCw className={loading ? 'animate-spin w-3.5 h-3.5' : 'w-3.5 h-3.5'} />
                      Resend OTP {otpTimer > 240 && `(${formatTimer(otpTimer)})`}
                    </button>

                    <button
                      onClick={() => setStep('login')}
                      className="mt-1 text-xs text-gray-400 transition hover:text-gray-200"
                    >
                      ← Back to login
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="mt-8 text-xs text-center text-gray-500">
            © {new Date().getFullYear()} Nira Body Care — Secure Admin Access
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50%      { opacity: 0.35; transform: scale(1.15); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 12s infinite ease-in-out;
        }
        .delay-1000 { animation-delay: 4s; }
      `}</style>
    </>
  );
}


