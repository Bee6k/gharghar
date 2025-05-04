"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building, CheckSquare, BarChart } from "lucide-react";
import Link from 'next/link';

// Mock data - replace with actual data fetching
const pendingListingsCount = 5;
const totalUsers = 150;
const totalListings = 75;

export default function AdminDashboardPage() {
    // TODO: Add authentication check for admin role

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-semibold">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {/* Pending Listings */}
                 <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                        <CheckSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingListingsCount}</div>
                        <p className="text-xs text-muted-foreground">Listings awaiting review</p>
                         <Button variant="outline" size="sm" className="mt-4" asChild>
                             <Link href="/dashboard/admin/approvals">Review Listings</Link>
                         </Button>
                    </CardContent>
                </Card>

                {/* User Management */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Manage Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalUsers}</div>
                        <p className="text-xs text-muted-foreground">Total registered users</p>
                         <Button variant="outline" size="sm" className="mt-4" asChild>
                            <Link href="/dashboard/admin/users">Manage Users</Link>
                         </Button>
                    </CardContent>
                </Card>

                {/* Listing Management */}
                <Card className="hover:shadow-lg transition-shadow">
                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Manage Listings</CardTitle>
                        <Building className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalListings}</div>
                        <p className="text-xs text-muted-foreground">Total active listings</p>
                         <Button variant="outline" size="sm" className="mt-4" asChild>
                            <Link href="/dashboard/admin/listings">Manage Listings</Link>
                         </Button>
                    </CardContent>
                </Card>

                 {/* Optional: Platform Analytics */}
                {/* <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Platform Analytics</CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">XXX</div>
                        <p className="text-xs text-muted-foreground">Key metric (e.g., daily visits)</p>
                        <Button variant="outline" size="sm" className="mt-4" disabled>View Analytics</Button>
                    </CardContent>
                </Card> */}
            </div>

            {/* Add other admin specific sections like reporting tools, settings etc. */}
            {/* <Card>
                <CardHeader><CardTitle>System Settings</CardTitle></CardHeader>
                <CardContent>
                   <p>Placeholder for admin settings.</p>
                </CardContent>
            </Card> */}
        </div>
    );
}
