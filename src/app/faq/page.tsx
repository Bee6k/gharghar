import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqData = [
    {
        question: "How do I list my property?",
        answer: "To list your property, you need to sign up as a Seller. Once logged in, navigate to your Seller Dashboard and click 'Add New Listing'. Fill in the property details, upload photos, and submit for admin approval. Our team will review it shortly."
    },
    {
        question: "How long does listing approval take?",
        answer: "Our admin team typically reviews new listings within 24-48 business hours. You will receive a notification once your listing is approved or if any changes are required."
    },
    {
        question: "How can I contact a seller?",
        answer: "On each property detail page, there is a 'Contact Seller' form. Fill in your name, email, and message, then click 'Send Inquiry'. Your message will be sent directly to the seller."
    },
    {
        question: "How do I save favorite properties?",
        answer: "When viewing a property you like, click the heart icon (♡). The property will be added to your 'Saved Properties' list, accessible from your Buyer Dashboard."
    },
    {
        question: "Is there a fee to use GharGhar?",
        answer: "Browsing listings and contacting sellers is free for buyers. For sellers, there might be different listing packages or fees depending on the chosen plan. Please check our 'Pricing' page (if applicable) or contact support for details."
    },
     {
        question: "How does the 'Verified Seller' badge work?",
        answer: "The 'Verified Seller' badge is awarded by our admin team after verifying the seller's identity and potentially their history on the platform. This adds an extra layer of trust for buyers."
    },
     {
        question: "Can I edit my listing after it's published?",
        answer: "Yes, sellers can edit their listings at any time through their Seller Dashboard. Significant changes might require re-approval from the admin team."
    }
];


export default function FaqPage() {
  return (
    <div className="space-y-12 max-w-3xl mx-auto">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground">Find answers to common questions about using GharGhar.</p>
      </section>

      <section>
         <Accordion type="single" collapsible className="w-full">
            {faqData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
      </section>

      <section className="text-center mt-12 border-t pt-8">
         <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
         <p className="text-muted-foreground mb-6">If you can't find the answer you're looking for, feel free to reach out to our support team.</p>
         <Button asChild>
            <a href="/contact">Contact Support</a>
         </Button>
      </section>

    </div>
  );
}
