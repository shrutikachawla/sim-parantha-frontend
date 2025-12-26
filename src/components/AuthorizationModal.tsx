import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // 1. Import your hook
import { Card, CardContent } from './shared/Card';
import { Input } from './shared';
import { Button } from './shared/button';
import { FaRegUserCircle } from "react-icons/fa";


interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthorizationModal: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth(); // 2. Get the login function
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Use the context login. It handles the API call and localStorage.
      await login(username, password);
      onClose(); 
    } catch (err: any) {
      // The error comes from your context/apiService
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white rounded-2xl shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
              <FaRegUserCircle size={30}/>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Staff Login</h2>
            <p className="text-gray-600 text-sm">Please login to place orders</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username*
              </label>
              <Input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password*
              </label>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm text-center">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-[#1a1a1a] hover:from-orange-600 hover:to-pink-600 text-white"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </form>


        </CardContent>
      </Card>
    </div>
  );
};

export default AuthorizationModal