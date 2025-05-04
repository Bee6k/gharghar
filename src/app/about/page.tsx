import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import { Users, Target, Eye } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-secondary rounded-lg shadow-sm">
        <h1 className="text-4xl font-bold mb-4 text-secondary-foreground">About GharGhar</h1>
        <p className="text-lg max-w-3xl mx-auto text-secondary-foreground">Connecting you to your perfect home, one listing at a time.</p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
           <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
           <p className="text-muted-foreground mb-4">
             GharGhar started with a simple idea: to make the process of finding and selling homes easier, more transparent, and more enjoyable for everyone involved. We saw the challenges buyers faced navigating endless listings and the hurdles sellers encountered reaching the right audience.
           </p>
           <p className="text-muted-foreground">
             Driven by a passion for real estate and technology, we built a platform that prioritizes user experience, trust, and efficiency. Our goal is to empower buyers with comprehensive information and sellers with the tools they need to succeed.
           </p>
        </div>
         <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
            {/* Placeholder image, replace with a relevant team or office photo */}
           <Image
             src="https://picsum.photos/800/600?random=30"
             alt="GharGhar Team or Office"
             layout="fill"
             objectFit="cover"
             data-ai-hint="modern office interior team working"
           />
         </div>
      </section>

       <section className="grid md:grid-cols-3 gap-6">
          <Card className="text-center shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-center mb-3"><Target size={36} className="text-accent" /></div>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">To simplify the real estate journey by providing a reliable, intuitive, and comprehensive platform for buyers and sellers.</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-center mb-3"><Eye size={36} className="text-accent" /></div>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">To be the most trusted and user-friendly online real estate marketplace, fostering positive connections and successful transactions.</p>
            </CardContent>
          </Card>
           <Card className="text-center shadow-sm hover:shadow-md transition-shadow">
             <CardHeader>
               <div className="flex justify-center mb-3"><Users size={36} className="text-accent" /></div>
               <CardTitle>Our Values</CardTitle>
             </CardHeader>
             <CardContent>
               <ul className="text-sm text-muted-foreground list-none space-y-1">
                 <li>Integrity & Trust</li>
                 <li>User-Centricity</li>
                 <li>Innovation</li>
                 <li>Simplicity</li>
               </ul>
             </CardContent>
           </Card>
        </section>

        {/* Optional: Meet the Team Section */}
        {/* <section>
          <h2 className="text-3xl font-semibold mb-6 text-center">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Add Team Member Cards here */}
          {/*</div>
        </section> */}

    </div>
  );
}
