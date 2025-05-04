"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppContext } from '@/context/AppContext';
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
    const { user, login, isAuthenticated } = useAppContext(); // Using login to update the context after "save"
    const { toast } = useToast();

    // State for form fields, initialized from context
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); // Assuming email exists, add if needed
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            // setEmail(user.email || ''); // Initialize email if available
            setLoading(false);
        } else if (isAuthenticated === false) { // Check if auth check is complete and user is not logged in
            // Optionally redirect to login if not authenticated
            // router.push('/login');
             setLoading(false); // Stop loading if not authenticated
        }
        // If isAuthenticated is undefined, we might still be waiting for context initialization
    }, [user, isAuthenticated]);


    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        // --- Mock Update Logic ---
        // In a real app, send this data to your backend API
        if (user) {
            const updatedUser = { ...user, username: username }; // Add other fields like email
            console.log("Updating profile:", updatedUser);
            login(updatedUser); // Update the context with new details
            toast({ title: "Profile Updated", description: "Your profile information has been saved." });
        }
        // --- End Mock Update Logic ---
    };

     const getInitials = (name: string = '') => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
    }

     if (loading) {
          return (
            <div className="max-w-2xl mx-auto space-y-6">
                 <Skeleton className="h-8 w-1/4" />
                 <Card>
                     <CardHeader>
                         <Skeleton className="h-6 w-1/2" />
                         <Skeleton className="h-4 w-3/4" />
                     </CardHeader>
                     <CardContent className="space-y-4">
                         <div className="flex items-center space-x-4">
                            <Skeleton className="h-16 w-16 rounded-full" />
                            <Skeleton className="h-10 w-32" />
                         </div>
                         <Skeleton className="h-10 w-full" />
                         <Skeleton className="h-10 w-full" />
                         <Skeleton className="h-10 w-full" />
                     </CardContent>
                     <CardFooter>
                         <Skeleton className="h-10 w-24" />
                     </CardFooter>
                 </Card>
             </div>
         );
     }

     if (!isAuthenticated || !user) {
         return (
             <div className="text-center py-12">
                 <p className="text-xl text-muted-foreground">Please log in to view your profile.</p>
                 <Button asChild className="mt-4">
                     <Link href="/login">Login</Link>
                 </Button>
             </div>
         );
     }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-semibold">My Profile</h1>
            <Card>
                <form onSubmit={handleProfileUpdate}>
                    <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                        <CardDescription>Update your profile details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                                {/* <AvatarImage src={user.avatarUrl} alt={user.username} /> */}
                                <AvatarFallback className="text-2xl">{getInitials(username)}</AvatarFallback>
                            </Avatar>
                             <Button variant="outline" type="button" disabled>Change Avatar</Button> {/* Placeholder */}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                             <Input
                                id="email"
                                type="email"
                                placeholder="your.email@example.com" // Placeholder if email not available
                                value={email} // Use email state
                                onChange={(e) => setEmail(e.target.value)} // Handle email changes
                                // required // Make required if necessary
                                // disabled // Disable if email shouldn't be changed easily
                            />
                         </div>
                         <div className="space-y-2">
                            <Label>Role</Label>
                            <Input value={user.role.charAt(0).toUpperCase() + user.role.slice(1)} disabled />
                         </div>
                         {/* Add fields for password change if needed */}
                          {/* <div className="space-y-2">
                             <Label htmlFor="current-password">Current Password</Label>
                             <Input id="current-password" type="password" />
                         </div>
                         <div className="space-y-2">
                             <Label htmlFor="new-password">New Password</Label>
                             <Input id="new-password" type="password" />
                         </div> */}
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Save Changes</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
