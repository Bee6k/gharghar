"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, BedDouble, Bath, Square, Heart, Send, Calendar } from 'lucide-react';
import Image from 'next/image';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { geocodeAddress, type Location } from '@/services/geocoding'; // Assuming geocoding service exists
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from "@/hooks/use-toast"

// Mock data for a single listing - replace with actual data fetching based on ID
const getListingById = async (id: string): Promise<any> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const listings = [
        { id: '1', title: 'Spacious Family Home', price: 550000, location: 'Miami, FL', address: '123 Sunshine Ave, Miami, FL 33101', bedrooms: 4, bathrooms: 3, area: 2500, description: 'Beautiful family home in a quiet neighborhood. Features a large backyard, modern kitchen, and spacious living areas. Perfect for families.', images: ['https://picsum.photos/800/600?random=11', 'https://picsum.photos/800/600?random=12', 'https://picsum.photos/800/600?random=13'], dataAiHint: 'modern house interior living room kitchen backyard', yearBuilt: 2010 },
        { id: '2', title: 'Downtown Loft Apartment', price: 320000, location: 'Austin, TX', address: '456 Main St, Austin, TX 78701', bedrooms: 1, bathrooms: 1, area: 800, description: 'Stylish loft in the heart of downtown. High ceilings, exposed brick, and walking distance to everything.', images: ['https://picsum.photos/800/600?random=21', 'https://picsum.photos/800/600?random=22'], dataAiHint: 'loft apartment interior exposed brick city view', yearBuilt: 1995 },
        // Add other listings if needed for testing different IDs
    ];
    const listing = listings.find(l => l.id === id);
    if (listing) {
        try {
            const geoLoc = await geocodeAddress(listing.address);
            return { ...listing, coordinates: geoLoc };
        } catch (error) {
            console.error("Geocoding failed:", error);
            return { ...listing, coordinates: null }; // Handle geocoding failure gracefully
        }
    }
    return null;
};


export default function PropertyDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const { toast } = useToast();
    const [listing, setListing] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false); // State for favorite toggle
    const [mapLocation, setMapLocation] = useState<Location | null>(null);

    useEffect(() => {
        if (id) {
            const fetchListing = async () => {
                setLoading(true);
                const data = await getListingById(id);
                setListing(data);
                if (data?.coordinates) {
                    setMapLocation(data.coordinates);
                }
                // TODO: Check if this property is in the user's favorites
                // setIsFavorite(checkIfFavorite(id));
                setLoading(false);
            };
            fetchListing();
        }
    }, [id]);

     // Handle client-side only API key access
     const [apiKey, setApiKey] = useState<string | null>(null);
     useEffect(() => {
         // Ensure this runs only on the client
         const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
         if (key) {
             setApiKey(key);
         } else {
             console.warn("Google Maps API key not found. Map functionality will be limited.");
         }
     }, []);


    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (listing?.images?.length || 1));
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (listing?.images?.length || 1)) % (listing?.images?.length || 1));
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        // TODO: Add API call to update user's favorites
        toast({
            title: isFavorite ? "Removed from Favorites" : "Added to Favorites",
            description: listing?.title,
        });
    };

     const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
         event.preventDefault();
         // TODO: Implement form submission logic (e.g., send email/inquiry)
         console.log("Contact form submitted");
          toast({
            title: "Inquiry Sent!",
            description: "The seller has been notified and will get back to you soon.",
            variant: "default", // Use 'default' or other variants as needed
          });
         // Reset form fields if necessary
         (event.target as HTMLFormElement).reset();
     };

    if (loading) {
        return (
             <div className="space-y-8">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-[400px] w-full rounded-lg" />
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                         <div className="grid grid-cols-2 gap-4">
                             <Skeleton className="h-10 w-full" />
                             <Skeleton className="h-10 w-full" />
                             <Skeleton className="h-10 w-full" />
                             <Skeleton className="h-10 w-full" />
                         </div>
                    </div>
                     <div className="space-y-4">
                         <Skeleton className="h-6 w-full" />
                         <Skeleton className="h-10 w-full" />
                         <Skeleton className="h-20 w-full" />
                         <Skeleton className="h-10 w-full" />
                     </div>
                </div>
                  <Skeleton className="h-[300px] w-full rounded-lg" />
             </div>
        );
    }

    if (!listing) {
        return <div className="text-center py-12 text-xl text-muted-foreground">Property not found.</div>;
    }

    return (
        <div className="space-y-8">
            {/* Title and Favorite Button */}
             <div className="flex justify-between items-start">
                 <div>
                    <h1 className="text-3xl font-semibold">{listing.title}</h1>
                    <p className="text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin size={16} /> {listing.location} - <span className="text-lg font-bold text-accent">${listing.price.toLocaleString()}</span>
                    </p>
                </div>
                <Button variant="ghost" size="icon" onClick={toggleFavorite} aria-label="Toggle Favorite">
                    <Heart className={`h-6 w-6 ${isFavorite ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />
                </Button>
            </div>


            {/* Image Carousel */}
            {listing.images && listing.images.length > 0 && (
                <Card className="overflow-hidden shadow-md">
                    <div className="relative h-64 md:h-96 w-full">
                        <Image
                            src={listing.images[currentImageIndex]}
                            alt={`${listing.title} - Image ${currentImageIndex + 1}`}
                            layout="fill"
                            objectFit="cover"
                            className="transition-opacity duration-300"
                            data-ai-hint={listing.dataAiHint}
                            priority={currentImageIndex === 0} // Prioritize loading the first image
                        />
                        {listing.images.length > 1 && (
                            <>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full opacity-70 hover:opacity-100"
                                    onClick={handlePrevImage}
                                >
                                    &lt;
                                </Button>
                                <Button
                                     variant="secondary"
                                     size="icon"
                                     className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full opacity-70 hover:opacity-100"
                                     onClick={handleNextImage}
                                >
                                    &gt;
                                </Button>
                                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 p-1 bg-black/30 rounded-full">
                                  {listing.images.map((_: any, index: number) => (
                                    <button
                                      key={index}
                                      onClick={() => setCurrentImageIndex(index)}
                                      className={`h-2 w-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                                      aria-label={`Go to image ${index + 1}`}
                                   />
                                  ))}
                                </div>
                            </>
                        )}
                    </div>
                </Card>
            )}

            {/* Main Content Grid */}
             <div className="grid md:grid-cols-3 gap-8">
                {/* Details Section */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Property Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4 text-sm">
                             <div className="flex items-center gap-2"><BedDouble size={18} className="text-muted-foreground"/> <span>{listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} Bedrooms`}</span></div>
                             <div className="flex items-center gap-2"><Bath size={18} className="text-muted-foreground"/> <span>{listing.bathrooms} Bathrooms</span></div>
                             <div className="flex items-center gap-2"><Square size={18} className="text-muted-foreground"/> <span>{listing.area} sqft</span></div>
                             <div className="flex items-center gap-2"><Calendar size={18} className="text-muted-foreground"/> <span>Built in {listing.yearBuilt}</span></div>
                             <div className="col-span-2 flex items-center gap-2"><MapPin size={18} className="text-muted-foreground"/> <span>{listing.address}</span></div>
                        </CardContent>
                    </Card>

                     <Card>
                         <CardHeader>
                             <CardTitle>Description</CardTitle>
                         </CardHeader>
                         <CardContent>
                             <p className="text-muted-foreground whitespace-pre-line">{listing.description}</p>
                         </CardContent>
                     </Card>
                 </div>

                {/* Contact Form Section */}
                 <div className="space-y-6">
                     <Card className="shadow-md">
                         <CardHeader>
                            <CardTitle>Contact Seller</CardTitle>
                             <CardDescription>Interested in this property? Send an inquiry.</CardDescription>
                         </CardHeader>
                         <CardContent>
                             <form onSubmit={handleContactSubmit} className="space-y-4">
                                 <div>
                                     <Label htmlFor="name">Name</Label>
                                     <Input id="name" type="text" placeholder="Your Name" required />
                                 </div>
                                 <div>
                                     <Label htmlFor="email">Email</Label>
                                     <Input id="email" type="email" placeholder="Your Email" required />
                                 </div>
                                 <div>
                                     <Label htmlFor="message">Message</Label>
                                     <Textarea id="message" placeholder="Your message..." required />
                                 </div>
                                 <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                    <Send size={16} className="mr-2"/> Send Inquiry
                                 </Button>
                             </form>
                         </CardContent>
                     </Card>
                 </div>
             </div>

              {/* Map Section */}
             {apiKey && mapLocation && (
                 <Card className="shadow-md">
                     <CardHeader>
                         <CardTitle>Location</CardTitle>
                     </CardHeader>
                     <CardContent className="h-[300px] md:h-[400px]">
                         <APIProvider apiKey={apiKey}>
                             <Map
                                 defaultCenter={mapLocation}
                                 defaultZoom={15}
                                 mapId="gharhgar-map" // Optional: for Cloud-based map styling
                                 gestureHandling={'greedy'}
                                 disableDefaultUI={true}
                             >
                                 <AdvancedMarker position={mapLocation} title={listing.title} />
                             </Map>
                         </APIProvider>
                     </CardContent>
                 </Card>
             )}
             {!apiKey && (
                 <Card>
                    <CardHeader><CardTitle>Location</CardTitle></CardHeader>
                    <CardContent><p className="text-muted-foreground">Map cannot be displayed. API key is missing.</p></CardContent>
                 </Card>
             )}
             {apiKey && !mapLocation && !loading && (
                 <Card>
                     <CardHeader><CardTitle>Location</CardTitle></CardHeader>
                     <CardContent><p className="text-muted-foreground">Could not determine property location for the map.</p></CardContent>
                 </Card>
             )}

        </div>
    );
}
