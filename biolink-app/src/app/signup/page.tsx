'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { validatePassword } from '@/lib/validation';

// A component to show password requirements
const PasswordRequirements = ({ password }: { password: string }) => {
    const checks = [
        { label: 'At least 8 characters', pattern: /.{8,}/ },
        { label: 'At least one uppercase letter', pattern: /[A-Z]/ },
        { label: 'At least one lowercase letter', pattern: /[a-z]/ },
        { label: 'At least one number', pattern: /[0-9]/ },
        { label: 'At least one special character', pattern: /[^A-Za-z0-9]/ },
    ];

    return (
        <ul className="text-sm text-gray-500 space-y-1 mt-2">
            {checks.map((check, index) => (
                <li key={index} className={`flex items-center ${check.pattern.test(password) ? 'text-green-600' : 'text-red-600'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {check.pattern.test(password) ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        )}
                    </svg>
                    {check.label}
                </li>
            ))}
        </ul>
    );
};


export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
        setError(passwordValidation.errors.join(' '));
        return;
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
        setError('Username can only contain letters, numbers, and underscores.');
        return;
    }

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, captchaToken: 'dummy-token' }),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      setError(data.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md fade-in">
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required pattern="^[a-zA-Z0-9_]+$" title="Username can only contain letters, numbers, and underscores." className="w-full p-3 border border-gray-300 rounded-lg"/>
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-lg"/>
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className="w-full p-3 border border-gray-300 rounded-lg"/>
            <PasswordRequirements password={password} />
          </div>
          <div className="flex items-center">
            <input id="captcha" type="checkbox" checked={isCaptchaChecked} onChange={(e) => setIsCaptchaChecked(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            <label htmlFor="captcha" className="ml-2 block text-sm text-gray-900">I am not a robot</label>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={!isCaptchaChecked} className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
