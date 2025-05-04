"use client";

import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
// Import sidebar components if implementing a sidebar layout
// import { SidebarProvider, Sidebar, SidebarTrigger, ... } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, userRole } = useAppContext();
  const router = useRouter();
  // Add a loading state until authentication status is confirmed
  const [isLoading, setIsLoading] = useState(true);


   useEffect(() => {
     // Wait until authentication status is determined
     if (isAuthenticated !== undefined) {
       if (!isAuthenticated) {
         // Redirect to login if not authenticated after check
         router.push('/login');
       } else {
         // Optional: Add role-based access control checks here if needed
         // Example: if (!['seller', 'buyer', 'admin'].includes(userRole)) router.push('/');
         setIsLoading(false); // Stop loading once authenticated
       }
     }
   }, [isAuthenticated, router]);


    if (isLoading) {
       // Show a loading state while checking authentication
       return (
           <div className="container mx-auto px-4 py-8 space-y-6">
               <Skeleton className="h-8 w-1/4" />
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
               </div>
                <Skeleton className="h-64 w-full" />
           </div>
       );
   }

   // If determined not authenticated (should be caught by useEffect redirect, but as fallback)
   if (!isAuthenticated) {
       return (
            <div className="text-center py-12">
                 <p className="text-xl text-muted-foreground">Redirecting to login...</p>
            </div>
        );
   }


  // Render the dashboard content once authenticated
  return (
    // Optional: Wrap with SidebarProvider if using a sidebar
    // <SidebarProvider>
    //   <Sidebar> ... Sidebar content ... </Sidebar>
    //   <SidebarInset>
          <div className="container mx-auto px-4 py-8">
            {/* Optional: Add dashboard-specific header or breadcrumbs here */}
            {children}
          </div>
    //   </SidebarInset>
    // </SidebarProvider>
  );
}


// Helper component for loading state - needs to be client component
import { useState } from 'react';
// (Keep the useEffect and isLoading state logic inside the main DashboardLayout component)

