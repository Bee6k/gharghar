"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { toast } = useToast();

   const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
       event.preventDefault();
       // TODO: Implement form submission logic (e.g., send email via API)
       console.log("Contact form submitted");
       toast({
           title: "Message Sent!",
           description: "Thank you for contacting us. We'll get back to you soon.",
           variant: "default",
       });
       // Reset form fields if necessary
       (event.target as HTMLFormElement).reset();
   };


  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg max-w-2xl mx-auto text-muted-foreground">We'd love to hear from you! Reach out with any questions or feedback.</p>
      </section>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Contact Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
             <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
             <form onSubmit={handleContactSubmit} className="space-y-4">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="space-y-1">
                         <Label htmlFor="name">Name</Label>
                         <Input id="name" type="text" placeholder="Your Name" required />
                     </div>
                     <div className="space-y-1">
                         <Label htmlFor="email">Email</Label>
                         <Input id="email" type="email" placeholder="Your Email" required />
                     </div>
                 </div>
                 <div className="space-y-1">
                     <Label htmlFor="subject">Subject</Label>
                     <Input id="subject" type="text" placeholder="Subject" required />
                 </div>
                 <div className="space-y-1">
                     <Label htmlFor="message">Message</Label>
                     <Textarea id="message" placeholder="Your message..." required rows={5} />
                 </div>
                 <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Send size={16} className="mr-2"/> Send Message
                 </Button>
             </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <Card className="shadow-sm">
            <CardContent className="pt-6 space-y-4">
               <div className="flex items-start gap-4">
                 <div className="bg-accent/10 p-3 rounded-full">
                    <Mail size={20} className="text-accent" />
                 </div>
                 <div>
                   <h3 className="font-medium">Email</h3>
                   <a href="mailto:info@gharbhar.com" className="text-muted-foreground hover:text-accent transition-colors">info@gharbhar.com</a>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-full">
                      <Phone size={20} className="text-accent" />
                   </div>
                 <div>
                   <h3 className="font-medium">Phone</h3>
                   <p className="text-muted-foreground">+1 (555) 123-4567</p>
                 </div>
               </div>
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-full">
                    <MapPin size={20} className="text-accent" />
                  </div>
                 <div>
                   <h3 className="font-medium">Address</h3>
                   <p className="text-muted-foreground">123 Real Estate Ave<br/>City, State 12345</p>
                   {/* <p className="text-sm mt-1"><a href="#" className="text-accent hover:underline">Get Directions</a></p> */}
                 </div>
               </div>
            </CardContent>
          </Card>
          {/* Optional Map Embed */}
          {/* <Card>
            <CardContent className="h-64 p-0 rounded-lg overflow-hidden">
              {/* Embed Google Map or similar here */}
           {/*} </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
}
