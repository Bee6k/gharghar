import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MapPin, Home, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock data for featured listings - replace with actual data fetching
const featuredListings = [
  { id: 1, title: 'Spacious Family Home', price: '$550,000', location: 'Miami, FL', image: 'https://picsum.photos/600/400?random=1', dataAiHint: 'modern house exterior' },
  { id: 2, title: 'Downtown Loft Apartment', price: '$320,000', location: 'Austin, TX', image: 'https://picsum.photos/600/400?random=2', dataAiHint: 'apartment building downtown' },
  { id: 3, title: 'Cozy Suburban Bungalow', price: '$410,000', location: 'Denver, CO', image: 'https://picsum.photos/600/400?random=3', dataAiHint: 'suburban house garden' },
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-secondary to-background py-20 px-4 rounded-lg shadow-md overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-foreground mix-blend-overlay">Find Your Dream Home with GharGhar</h1>
          <p className="text-lg md:text-xl mb-8 text-primary-foreground mix-blend-overlay">Search properties, connect with sellers, and make your move.</p>
          <form className="max-w-2xl mx-auto bg-card p-4 rounded-lg shadow-lg flex items-center gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Enter location, keywords..."
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button type="submit" variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Search
            </Button>
          </form>
        </div>
      </section>

      {/* Featured Listings Carousel (Simplified as Grid for now) */}
      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center">Featured Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link href={`/listings/${listing.id}`} className="block">
                <div className="relative h-48 w-full">
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={listing.dataAiHint}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl truncate">{listing.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1 pt-1">
                    <MapPin size={16} className="text-muted-foreground" />
                    {listing.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-accent">{listing.price}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/listings">
            <Button variant="outline">
              View All Listings
            </Button>
          </Link>
        </div>
      </section>

      {/* Trust Building Cards */}
      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center">Why Choose GharGhar?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-center mb-4">
                 <Home size={40} className="text-accent" />
              </div>
              <CardTitle>Vast Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Explore thousands of properties across various locations and price ranges.</CardDescription>
            </CardContent>
          </Card>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
               <div className="flex justify-center mb-4">
                 <ShieldCheck size={40} className="text-accent" />
              </div>
              <CardTitle>Verified Sellers</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Connect with trusted sellers vetted by our admin team for your peace of mind.</CardDescription>
            </CardContent>
          </Card>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
               <div className="flex justify-center mb-4">
                 <Search size={40} className="text-accent" />
               </div>
              <CardTitle>Easy Search</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Our dynamic search and filtering tools make finding your perfect home simple.</CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
