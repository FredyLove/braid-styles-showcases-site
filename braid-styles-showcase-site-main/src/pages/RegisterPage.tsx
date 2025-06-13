import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Navigation from '../components/Navigation';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('user')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      console.log("Sending:", { name, email, password, role });
      const response = await fetch('http://localhost:8000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name,
          email,
          password,
          role
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
      }

      setError('');
      navigate('/login');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 p-20">
        <div className="max-w-md w-full p-10 bg-white rounded-3xl shadow-xl">
          <div className="text-center mb-5">
            <div className="mx-auto w-24 h-24 bg-[#f8e8d8] rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-[#b36f34]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-[#b36f34] mb-2 font-serif">Create Account</h1>
            <p className="text-[#b36f34]/80">Join the BraidArt community</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-red-700">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#b36f34] mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-[#b36f34]/70" />
                </div>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-[#b36f34] placeholder-[#b36f34]/50 border border-[#b36f34]/30 rounded-xl focus:ring-2 focus:ring-[#b36f34]/50 focus:border-[#b36f34]/50"
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#b36f34] mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-[#b36f34]/70" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-[#b36f34] placeholder-[#b36f34]/50 border border-[#b36f34]/30 rounded-xl focus:ring-2 focus:ring-[#b36f34]/50 focus:border-[#b36f34]/50"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#b36f34] mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-[#b36f34]/70" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-[#b36f34] placeholder-[#b36f34]/50 border border-[#b36f34]/30 rounded-xl focus:ring-2 focus:ring-[#b36f34]/50 focus:border-[#b36f34]/50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#b36f34] mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-[#b36f34]/70" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-[#b36f34] placeholder-[#b36f34]/50 border border-[#b36f34]/30 rounded-xl focus:ring-2 focus:ring-[#b36f34]/50 focus:border-[#b36f34]/50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-[#b36f34] focus:ring-[#b36f34]/50 border-[#b36f34]/30 rounded mt-1"
                required
              />
              <label htmlFor="terms" className="ml-3 text-sm text-[#b36f34]/80">
                I agree to the{' '}
                <Link to="/terms" className="underline hover:text-[#9e5f2d]">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="underline hover:text-[#9e5f2d]">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#b36f34] to-[#d38a40] hover:from-[#a05d28] hover:to-[#b36f34] text-white font-medium rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.01]"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#b36f34]/80">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-[#b36f34] hover:text-[#b36f34]/70 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
