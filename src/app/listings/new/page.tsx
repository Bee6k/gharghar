"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { Upload, MapPin, BedDouble, Bath, Square, Calendar, Tag, Image as ImageIcon } from 'lucide-react';
// Assuming a check for seller role would happen in a real app, potentially via context or middleware
// import { useAppContext } from '@/context/AppContext';

export default function NewListingPage() {
  // const { userRole } = useAppContext(); // Use context to verify role if needed
  const router = useRouter();
  const { toast } = useToast();

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState(''); // e.g., City, ST
  const [price, setPrice] = useState<number | string>('');
  const [bedrooms, setBedrooms] = useState<number | string>('');
  const [bathrooms, setBathrooms] = useState<number | string>('');
  const [area, setArea] = useState<number | string>('');
  const [yearBuilt, setYearBuilt] = useState<number | string>('');
  const [images, setImages] = useState<File[]>([]); // For file uploads

  // TODO: Add authentication and role check (only sellers should access)
  // useEffect(() => {
  //   if (userRole !== 'seller') {
  //     toast({ title: "Access Denied", description: "You must be a seller to create listings.", variant: "destructive" });
  //     router.push('/'); // Redirect non-sellers
  //   }
  // }, [userRole, router, toast]);


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
          // Append new files to the existing array
          setImages(prev => [...prev, ...Array.from(event.target.files!)]);
          // TODO: Add validation for file type, size, and count
      }
  };

  const removeImage = (index: number) => {
      setImages(prev => prev.filter((_, i) => i !== index));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // --- Mock Submit Logic ---
    // In a real app, you'd typically use FormData to send data + files to your backend API
    const listingData = {
      title, description, address, location,
      price: Number(price),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      area: Number(area),
      yearBuilt: Number(yearBuilt),
      // Handle images separately, likely uploading them and associating URLs
    };
    console.log("Submitting new listing:", listingData);
    console.log("Images to upload:", images.map(img => img.name));

    // Simulate API call success
    toast({
      title: "Listing Submitted!",
      description: "Your property listing has been sent for admin approval.",
    });
    router.push('/dashboard/seller'); // Redirect to seller dashboard after submission
    // --- End Mock Submit Logic ---
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-semibold">Create New Listing</h1>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Property Information</CardTitle>
            <CardDescription>Fill in the details about the property you want to list.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             {/* Basic Info */}
             <div className="space-y-2">
                 <Label htmlFor="title">Property Title <span className="text-destructive">*</span></Label>
                 <Input id="title" placeholder="e.g., Charming 3-Bed Bungalow" value={title} onChange={(e) => setTitle(e.target.value)} required />
             </div>
             <div className="space-y-2">
                 <Label htmlFor="description">Description <span className="text-destructive">*</span></Label>
                 <Textarea id="description" placeholder="Describe the property..." value={description} onChange={(e) => setDescription(e.target.value)} required rows={5}/>
             </div>

             {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                     <Label htmlFor="address">Full Address <span className="text-destructive">*</span></Label>
                     <Input id="address" placeholder="123 Main St, Anytown" value={address} onChange={(e) => setAddress(e.target.value)} required icon={MapPin}/>
                 </div>
                 <div className="space-y-2">
                     <Label htmlFor="location">City, State <span className="text-destructive">*</span></Label>
                     <Input id="location" placeholder="Anytown, ST" value={location} onChange={(e) => setLocation(e.target.value)} required />
                 </div>
             </div>

             {/* Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <div className="space-y-2">
                     <Label htmlFor="price">Price ($) <span className="text-destructive">*</span></Label>
                     <Input id="price" type="number" placeholder="500000" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" icon={Tag}/>
                 </div>
                 <div className="space-y-2">
                     <Label htmlFor="bedrooms">Bedrooms <span className="text-destructive">*</span></Label>
                     <Input id="bedrooms" type="number" placeholder="3" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} required min="0" icon={BedDouble}/>
                 </div>
                  <div className="space-y-2">
                     <Label htmlFor="bathrooms">Bathrooms <span className="text-destructive">*</span></Label>
                     <Input id="bathrooms" type="number" step="0.5" placeholder="2.5" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} required min="0" icon={Bath}/>
                 </div>
                  <div className="space-y-2">
                     <Label htmlFor="area">Area (sqft) <span className="text-destructive">*</span></Label>
                     <Input id="area" type="number" placeholder="1800" value={area} onChange={(e) => setArea(e.target.value)} required min="0" icon={Square}/>
                 </div>
                 <div className="space-y-2 md:col-span-1"> {/* Adjust span if needed */}
                     <Label htmlFor="yearBuilt">Year Built</Label>
                     <Input id="yearBuilt" type="number" placeholder="1995" value={yearBuilt} onChange={(e) => setYearBuilt(e.target.value)} min="1800" max={new Date().getFullYear()} icon={Calendar}/>
                 </div>
             </div>

              {/* Image Upload */}
             <div className="space-y-2">
                 <Label htmlFor="images">Property Images</Label>
                 <Card className="border-dashed border-2 hover:border-primary">
                    <CardContent className="p-6 text-center">
                       <label htmlFor="images" className="cursor-pointer space-y-2 flex flex-col items-center">
                           <Upload className="h-8 w-8 text-muted-foreground" />
                           <span className="text-primary font-medium">Click or drag files to upload</span>
                           <span className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</span>
                            <Input id="images" type="file" multiple className="hidden" onChange={handleImageChange} accept="image/png, image/jpeg, image/gif" />
                       </label>
                    </CardContent>
                 </Card>
                 {/* Image Previews */}
                 {images.length > 0 && (
                     <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                         {images.map((file, index) => (
                             <div key={index} className="relative group aspect-square">
                                 <Image
                                     src={URL.createObjectURL(file)}
                                     alt={`Preview ${index + 1}`}
                                     layout="fill"
                                     objectFit="cover"
                                     className="rounded-md"
                                 />
                                  <Button
                                     variant="destructive"
                                     size="icon"
                                     className="absolute top-1 right-1 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                                     onClick={() => removeImage(index)}
                                     type="button"
                                 >
                                     <span className="text-xs">X</span>
                                     <span className="sr-only">Remove image {index+1}</span>
                                 </Button>
                             </div>
                         ))}
                     </div>
                 )}
             </div>


          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full md:w-auto">Submit for Approval</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
