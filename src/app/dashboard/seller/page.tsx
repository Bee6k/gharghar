"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, MessageSquare, PlusCircle, User, BarChart } from "lucide-react";
import Link from 'next/link';

// Mock data - replace with actual data fetching
const listings = [
    { id: 1, title: 'Spacious Family Home', status: 'Approved', views: 150, inquiries: 5 },
    { id: 9, title: 'Lakefront Property', status: 'Pending Approval', views: 0, inquiries: 0 },
];

const inquiries = [
    { id: 201, buyerName: 'Alice Smith', propertyTitle: 'Spacious Family Home', date: '2024-07-29', status: 'New' },
    { id: 202, buyerName: 'Bob Johnson', propertyTitle: 'Spacious Family Home', date: '2024-07-28', status: 'Replied' },
];

export default function SellerDashboardPage() {
    // TODO: Add authentication check for seller role

    const pendingListings = listings.filter(l => l.status === 'Pending Approval').length;
    const activeListings = listings.filter(l => l.status === 'Approved').length;
    const newInquiries = inquiries.filter(i => i.status === 'New').length;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                 <h1 className="text-3xl font-semibold">Seller Dashboard</h1>
                 <Button asChild>
                   <Link href="/listings/new"> {/* Link to create new listing page */}
                     <PlusCircle className="mr-2 h-4 w-4" /> Add New Listing
                   </Link>
                 </Button>
             </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* My Listings Overview */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">My Listings</CardTitle>
                        <Building className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeListings} Active</div>
                        <p className="text-xs text-muted-foreground">{pendingListings} Pending Approval</p>
                        <Button variant="outline" size="sm" className="mt-4" asChild>
                           <Link href="/dashboard/seller/listings">Manage Listings</Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* Inquiries Overview */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Buyer Inquiries</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{newInquiries} New</div>
                        <p className="text-xs text-muted-foreground">{inquiries.length} Total Inquiries</p>
                        <Button variant="outline" size="sm" className="mt-4" asChild>
                           <Link href="/dashboard/seller/inquiries">View Inquiries</Link>
                        </Button>
                    </CardContent>
                </Card>

                 {/* Profile Section Link */}
                 <Card className="hover:shadow-lg transition-shadow">
                    <Link href="/profile"> {/* Link to profile settings */}
                       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">My Profile</CardTitle>
                          <User className="h-4 w-4 text-muted-foreground" />
                       </CardHeader>
                       <CardContent>
                          <div className="text-2xl font-bold">Manage</div>
                          <p className="text-xs text-muted-foreground">Update your profile and contact details</p>
                       </CardContent>
                    </Link>
                 </Card>

                 {/* Optional: Performance / Analytics Card */}
                {/* <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Listing Performance</CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">XXX Views</div>
                        <p className="text-xs text-muted-foreground">Total views this month</p>
                        <Button variant="outline" size="sm" className="mt-4" disabled>View Analytics</Button>
                    </CardContent>
                </Card> */}
            </div>

             {/* Quick Actions or Recent Activity could go here */}

        </div>
    );
}
