"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, BedDouble, Bath, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

// Mock data for listings - replace with actual data fetching
const allListings = [
  { id: 1, title: 'Spacious Family Home', price: 550000, location: 'Miami, FL', bedrooms: 4, bathrooms: 3, image: 'https://picsum.photos/600/400?random=1', dataAiHint: 'modern house exterior' },
  { id: 2, title: 'Downtown Loft Apartment', price: 320000, location: 'Austin, TX', bedrooms: 1, bathrooms: 1, image: 'https://picsum.photos/600/400?random=2', dataAiHint: 'apartment building downtown' },
  { id: 3, title: 'Cozy Suburban Bungalow', price: 410000, location: 'Denver, CO', bedrooms: 3, bathrooms: 2, image: 'https://picsum.photos/600/400?random=3', dataAiHint: 'suburban house garden' },
  { id: 4, title: 'Luxury Beachfront Condo', price: 1200000, location: 'Miami, FL', bedrooms: 3, bathrooms: 3, image: 'https://picsum.photos/600/400?random=4', dataAiHint: 'luxury condo beachfront view' },
  { id: 5, title: 'Charming Studio', price: 250000, location: 'Austin, TX', bedrooms: 0, bathrooms: 1, image: 'https://picsum.photos/600/400?random=5', dataAiHint: 'small studio apartment interior' },
  { id: 6, title: 'Mountain View Cabin', price: 680000, location: 'Denver, CO', bedrooms: 2, bathrooms: 2, image: 'https://picsum.photos/600/400?random=6', dataAiHint: 'cabin mountain view woods' },
   { id: 7, title: 'Historic Townhouse', price: 750000, location: 'Austin, TX', bedrooms: 4, bathrooms: 2.5, image: 'https://picsum.photos/600/400?random=7', dataAiHint: 'historic townhouse brick exterior' },
   { id: 8, title: 'Modern Minimalist Home', price: 950000, location: 'Miami, FL', bedrooms: 5, bathrooms: 4, image: 'https://picsum.photos/600/400?random=8', dataAiHint: 'modern minimalist house white exterior' },
];

const locations = ['All', 'Miami, FL', 'Austin, TX', 'Denver, CO'];
const bedroomOptions = ['Any', '1', '2', '3', '4', '5+'];

export default function ListingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedBedrooms, setSelectedBedrooms] = useState('Any');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500000]); // Example range


  const handlePriceChange = (value: number[]) => {
    setPriceRange(value as [number, number]);
  };


  const filteredListings = useMemo(() => {
    return allListings.filter(listing => {
      const matchesSearch = searchTerm === '' ||
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation = selectedLocation === 'All' || listing.location === selectedLocation;

      const matchesBedrooms = selectedBedrooms === 'Any' ||
        (selectedBedrooms === '5+' && listing.bedrooms >= 5) ||
        listing.bedrooms === parseInt(selectedBedrooms, 10);

      const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1];


      return matchesSearch && matchesLocation && matchesBedrooms && matchesPrice;
    });
  }, [searchTerm, selectedLocation, selectedBedrooms, priceRange]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Property Listings</h1>

      {/* Filters Section */}
      <Card className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Search Input */}
          <div className="space-y-1">
            <Label htmlFor="search">Search</Label>
             <div className="relative">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                id="search"
                type="text"
                placeholder="Keywords, address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Location Select */}
           <div className="space-y-1">
             <Label htmlFor="location">Location</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(loc => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
           </div>

          {/* Bedrooms Select */}
          <div className="space-y-1">
             <Label htmlFor="bedrooms">Bedrooms</Label>
             <Select value={selectedBedrooms} onValueChange={setSelectedBedrooms}>
                <SelectTrigger id="bedrooms">
                  <SelectValue placeholder="Any Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                   {bedroomOptions.map(opt => (
                     <SelectItem key={opt} value={opt}>{opt === 'Any' ? 'Any' : `${opt} Beds`}</SelectItem>
                   ))}
                </SelectContent>
              </Select>
           </div>


           {/* Price Range Slider */}
           <div className="space-y-1 col-span-1 md:col-span-2 lg:col-span-1">
            <Label htmlFor="price-range">Price Range</Label>
             <div className="pt-2">
                 <Slider
                    id="price-range"
                    min={0}
                    max={1500000} // Adjust max based on your data
                    step={10000}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    minStepsBetweenThumbs={1}
                    className="mb-2"
                 />
                 <div className="flex justify-between text-xs text-muted-foreground">
                    <span>${priceRange[0].toLocaleString()}</span>
                    <span>${priceRange[1].toLocaleString()}</span>
                 </div>
             </div>
           </div>

           {/* Optional: Add Apply Filters Button if needed */}
           {/* <Button className="lg:col-start-4">Apply Filters</Button> */}
        </div>
      </Card>

      {/* Listings Grid */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <Link href={`/listings/${listing.id}`} className="block flex-grow">
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
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div>
                     <p className="text-lg font-semibold text-accent mb-2">${listing.price.toLocaleString()}</p>
                     <div className="flex space-x-4 text-sm text-muted-foreground">
                       <span className="flex items-center gap-1">
                         <BedDouble size={16} /> {listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} Beds`}
                       </span>
                       <span className="flex items-center gap-1">
                         <Bath size={16} /> {listing.bathrooms} Baths
                       </span>
                     </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No listings found matching your criteria.</p>
        </div>
      )}
       {/* TODO: Add Pagination if many listings */}
    </div>
  );
}
