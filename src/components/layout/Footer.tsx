"use client";

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Home, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground border-t mt-12">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <Link href="/" className="flex items-center space-x-2 mb-4">
             <Home className="h-7 w-7 text-accent" />
             <span className="font-bold text-xl text-foreground">GharGhar</span>
          </Link>
          <p className="text-sm">Find your next home with ease. Connecting buyers and sellers across the nation.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/listings" className="hover:text-accent transition-colors">All Listings</Link></li>
            <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            <li><Link href="/faq" className="hover:text-accent transition-colors">FAQ</Link></li> {/* Assuming FAQ page exists */}
             <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li> {/* Assuming privacy page exists */}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-4 text-foreground">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <a href="mailto:info@gharbhar.com" className="hover:text-accent transition-colors">info@gharbhar.com</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <span>+1 (555) 123-4567</span>
            </li>
             {/* Add Address if applicable */}
             {/* <li className="flex items-start gap-2">
               <MapPin size={16} className="mt-1"/>
               <span>123 Real Estate Ave,<br/> City, State 12345</span>
             </li> */}
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h4 className="font-semibold mb-4 text-foreground">Newsletter</h4>
          <p className="text-sm mb-3">Stay updated with the latest listings and news.</p>
          <form className="flex items-center gap-2">
            <Input type="email" placeholder="Enter your email" className="flex-grow bg-background" />
            <Button type="submit" variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">Subscribe</Button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-background py-4">
        <div className="container text-center text-sm">
           &copy; {currentYear} GharGhar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
