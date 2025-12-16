import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Lock, Mail, Loader2 } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simple mock validation (accept any email/pass for demo)
    if (email && password) {
       router.push('/admin');
    } else {
       setIsLoading(false);
       // Show error (omitted for brevity)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Head>
        <title>Login | SmartStay</title>
      </Head>

      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-2">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                <Lock className="h-6 w-6 text-primary-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome back</CardTitle>
            <CardDescription>Sign in to your host dashboard</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                            type="email"
                            placeholder="name@example.com"
                            className="pl-9"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <a href="#" className="text-sm text-primary-600 hover:text-primary-500">Forgot password?</a>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-9"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <Button type="submit" className="w-full" isLoading={isLoading}>
                    Sign in
                </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
                Don't have an account? <a href="#" className="font-medium text-primary-600 hover:text-primary-500">Sign up</a>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
