"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation'; // Use App Router's router
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const { login } = useAppContext();
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // --- Mock Authentication Logic ---
    // In a real app, replace this with an API call to your backend
    if (username === 'buyer' && password === 'password') {
      login({ id: '1', username: 'Buyer User', role: 'buyer' });
      toast({ title: "Login Successful", description: "Welcome back!" });
      router.push('/dashboard/buyer');
    } else if (username === 'seller' && password === 'password') {
      login({ id: '2', username: 'Seller User', role: 'seller' });
       toast({ title: "Login Successful", description: "Welcome back!" });
      router.push('/dashboard/seller');
    } else if (username === 'admin' && password === 'password') {
      login({ id: '3', username: 'Admin User', role: 'admin' });
       toast({ title: "Login Successful", description: "Welcome back, Admin!" });
      router.push('/dashboard/admin');
    } else {
      setError('Invalid username or password.');
       toast({ title: "Login Failed", description: "Invalid username or password.", variant: "destructive" });
    }
    // --- End Mock Authentication Logic ---
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Login to GharGhar</CardTitle>
          <CardDescription>Enter your username and password below</CardDescription>
           <CardDescription className="text-xs text-muted-foreground pt-2">
             Use: (buyer/password), (seller/password), (admin/password)
           </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="e.g., buyer"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">Login</Button>
             <p className="text-xs text-center text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/signup" className="underline hover:text-accent">
                    Sign up
                </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
