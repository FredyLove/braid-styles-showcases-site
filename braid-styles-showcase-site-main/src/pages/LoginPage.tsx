import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Navigation from '../components/Navigation'

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || "Login failed");
        return;
      }
  
      const data = await response.json();
      const payload = JSON.parse(atob(data.access_token.split('.')[1]));
      const token = data.access_token;
      const role = data.role;

      localStorage.setItem("user_email", email);
      localStorage.setItem("access_token", token); // Save JWT token
      localStorage.setItem("role", data.role); 
      localStorage.setItem("username", payload.sub); // 👈 Store username
  
      // Redirect or update UI
        if (role === "admin") {
          window.location.href = "/admin-dashboard";
        } else {
          window.location.href = "/client-dashboard";
        }

    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login.");
    }
  };


  return (
    <>
    <Navigation/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 p-20">
      <div className="max-w-md w-full p-10 bg-white rounded-3xl shadow-xl">
        <div className="text-center mb-10">
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
          <h1 className="text-4xl font-bold text-[#b36f34] mb-2 font-serif">Welcome Back</h1>
          <p className="text-[#b36f34]/80">Sign in to continue your braiding journey</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-red-700">{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-[#b36f34]">
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

          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-[#b36f34]">
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#b36f34] focus:ring-[#b36f34]/50 border-[#b36f34]/30 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[#b36f34]/80">
                Remember me
              </label>
            </div>

            <Link 
              to="/forgot-password" 
              className="text-sm font-medium text-[#b36f34] hover:text-[#b36f34]/70 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-gradient-to-r from-[#b36f34] to-[#d38a40] hover:from-[#a05d28] hover:to-[#b36f34] text-white font-medium rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.01]"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#b36f34]/20"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-sm text-[#b36f34]/60">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center py-2.5 px-4 border border-[#b36f34]/20 rounded-xl text-sm font-medium text-[#b36f34] hover:bg-[#f8e8d8] transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center py-2.5 px-4 border border-[#b36f34]/20 rounded-xl text-sm font-medium text-[#b36f34] hover:bg-[#f8e8d8] transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.325v21.351C0 23.404.595 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .595 23.404 0 22.675 0z"/>
              </svg>
              Facebook
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-[#b36f34]/80">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="font-medium text-[#b36f34] hover:text-[#b36f34]/70 hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
    
  );
  </>
  )
};