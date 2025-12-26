import React, { useState } from 'react';
import { useDesignStore } from '../../store/designStore';

export const LoginModal = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // We'll simulate login for now until API is connected fully
    const handleAuth = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            // Basic fetch to our backend
            // Note: In dev, we need proxy or full URL. Using full URL for test environment if reachable
            const API_URL = import.meta.env.VITE_API_URL || 'https://apitest.gidpe.com.ar';

            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name: isLogin ? undefined : 'New User' })
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Authentication failed');

            // Save token (in real app, use secure context)
            localStorage.setItem('token', data.token);
            window.location.reload(); // Simple reload to refresh app state

        } catch (err) {
            setError(err.message);
            // Fallback for demo if backend not ready:
            if (email === 'admin@luminapack.com' && password === 'password123') {
                localStorage.setItem('token', 'demo-token');
                window.location.reload();
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md">
            <div className="w-full max-w-md p-8 bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                        LuminaPack AI
                    </h1>
                    <p className="text-gray-400">Welcome back, Designer.</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#222] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors"
                            placeholder="name@company.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#222] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-lg shadow-lg shadow-blue-900/20 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-blue-400 hover:text-blue-300 font-medium"
                        >
                            {isLogin ? 'Sign up' : 'Log in'}
                        </button>
                    </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-xs text-gray-600">Demo Credentials:</p>
                    <code className="text-xs text-yellow-500 bg-white/5 px-2 py-1 rounded">admin@luminapack.com / password123</code>
                </div>
            </div>
        </div>
    );
};
