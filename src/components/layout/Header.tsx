"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Moon, Sun, User, LogOut, Home, Building, LayoutDashboard } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function Header() {
  const { theme, toggleTheme, user, logout, isAuthenticated, userRole } = useAppContext();

  const getInitials = (name: string = '') => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Home className="h-6 w-6 text-accent" />
          <span className="font-bold sm:inline-block text-lg">GharGhar</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium flex-1">
          <Link href="/listings" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Listings
          </Link>
          {isAuthenticated && userRole === 'seller' && (
            <Link href="/dashboard/seller" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Seller Dashboard
            </Link>
          )}
           {isAuthenticated && userRole === 'buyer' && (
            <Link href="/dashboard/buyer" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Buyer Dashboard
            </Link>
          )}
           {isAuthenticated && userRole === 'admin' && (
            <Link href="/dashboard/admin" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Admin Dashboard
            </Link>
          )}
          <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
            About Us
          </Link>
           <Link href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Contact
          </Link>
        </nav>

        <div className="flex items-center justify-end space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          {isAuthenticated && user ? (
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                     <Avatar className="h-8 w-8">
                       {/* Add AvatarImage if user profile picture exists */}
                       {/* <AvatarImage src={user.avatarUrl} alt={user.username} /> */}
                       <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
                     </Avatar>
                   </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                     <div className="flex flex-col space-y-1">
                       <p className="text-sm font-medium leading-none">{user.username}</p>
                       <p className="text-xs leading-none text-muted-foreground">{user.role}</p>
                     </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                   <DropdownMenuItem asChild>
                     <Link href={
                        userRole === 'seller' ? '/dashboard/seller' :
                        userRole === 'buyer' ? '/dashboard/buyer' :
                        '/dashboard/admin' // Default to admin or handle appropriately
                     }>
                       <LayoutDashboard className="mr-2 h-4 w-4" />
                       <span>Dashboard</span>
                     </Link>
                  </DropdownMenuItem>
                   <DropdownMenuItem asChild>
                     <Link href="/profile"> {/* Assuming a general profile page */}
                       <User className="mr-2 h-4 w-4" />
                       <span>Profile</span>
                     </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
