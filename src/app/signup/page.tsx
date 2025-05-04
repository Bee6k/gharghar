"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";

type Role = 'buyer' | 'seller';

export default function SignUpPage() {
  const { login } = useAppContext(); // Use login to simulate successful signup & login
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<Role>('buyer');
  const [error, setError] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
       toast({ title: "Signup Failed", description: "Passwords do not match.", variant: "destructive" });
      return;
    }

    // --- Mock Sign Up Logic ---
    // In a real app, replace this with an API call to your backend to create the user
    console.log(`Signing up user: ${username}, Role: ${role}`);
    // Simulate successful signup and login
    const newUser = { id: Date.now().toString(), username: username, role: role };
    login(newUser);
    toast({ title: "Signup Successful!", description: `Welcome, ${username}!` });
    // Redirect based on role
    router.push(role === 'buyer' ? '/dashboard/buyer' : '/dashboard/seller');
    // --- End Mock Sign Up Logic ---
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>Join GharGhar today!</CardDescription>
        </CardHeader>
        <form onSubmit={handleSignUp}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
             <div className="space-y-2">
                <Label htmlFor="role">I am a...</Label>
                <Select value={role} onValueChange={(value: Role) => setRole(value)}>
                   <SelectTrigger id="role">
                      <SelectValue placeholder="Select your role" />
                   </SelectTrigger>
                   <SelectContent>
                      <SelectItem value="buyer">Buyer</SelectItem>
                      <SelectItem value="seller">Seller</SelectItem>
                   </SelectContent>
                 </Select>
             </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                required
                 minLength={6} // Add basic validation
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                required
                 minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">Sign Up</Button>
             <p className="text-xs text-center text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="underline hover:text-accent">
                    Login
                </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
