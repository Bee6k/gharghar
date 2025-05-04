"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, User } from "lucide-react";
import Link from 'next/link';

// Mock data - replace with actual data fetching
const savedProperties = [
  { id: 1, title: 'Spacious Family Home', price: '$550,000', location: 'Miami, FL', image: 'https://picsum.photos/300/200?random=1', dataAiHint: 'modern house exterior' },
  { id: 4, title: 'Luxury Beachfront Condo', price: '$1,200,000', location: 'Miami, FL', image: 'https://picsum.photos/300/200?random=4', dataAiHint: 'luxury condo beachfront view' },
];

const inquiryHistory = [
  { id: 101, propertyTitle: 'Downtown Loft Apartment', status: 'Replied', date: '2024-07-28' },
  { id: 102, propertyTitle: 'Cozy Suburban Bungalow', status: 'Sent', date: '2024-07-25' },
];


export default function BuyerDashboardPage() {
  // TODO: Add authentication check here

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Buyer Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Section Link */}
        <Card className="hover:shadow-lg transition-shadow">
           <Link href="/profile"> {/* Link to profile settings */}
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">My Profile</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
             </CardHeader>
             <CardContent>
                <div className="text-2xl font-bold">Manage</div>
                <p className="text-xs text-muted-foreground">Update your contact information and preferences</p>
             </CardContent>
           </Link>
        </Card>

        {/* Saved Properties Overview */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Properties</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savedProperties.length}</div>
            <p className="text-xs text-muted-foreground">Properties you've saved</p>
             <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link href="/dashboard/buyer/saved">View All</Link>
             </Button>
          </CardContent>
        </Card>

        {/* Inquiry History Overview */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inquiry History</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inquiryHistory.length}</div>
            <p className="text-xs text-muted-foreground">Messages sent to sellers</p>
             <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link href="/dashboard/buyer/inquiries">View History</Link>
             </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions or Recent Activity could go here */}
      {/* <Card>
        <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
        <CardContent>
          <p>Placeholder for recent searches or viewed properties.</p>
        </CardContent>
      </Card> */}
    </div>
  );
}
