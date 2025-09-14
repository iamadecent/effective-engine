import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";
import { Check } from "lucide-react";

export default function LandingPage() {
  const features = [
    "Unlimited Links",
    "Customizable Profiles",
    "In-depth Analytics",
    "Email List Integration",
    "Shoppable Links",
    "And so much more...",
  ];

  return (
    <>
      <section className="container mx-auto text-center py-20 sm:py-32">
        <h1 className="text-4xl sm:text-6xl font-bold">Your One Link for Everything</h1>
        <p className="text-lg sm:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
          Share all your content, products, and social profiles with a single, beautiful link that you control.
        </p>
        <div className="mt-8">
          <Link href="/signup">
            <Button size="lg">Get Started for Free</Button>
          </Link>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">All The Features You Need</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature} className="bg-background">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-primary" />
                    {feature}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto text-center py-20">
        <h2 className="text-3xl font-bold">Join thousands of creators</h2>
        <p className="text-lg text-muted-foreground mt-2">
          Start building your brand on the ultimate biolink platform.
        </p>
        <div className="mt-8">
          <Link href="/signup">
            <Button size="lg">Sign Up Now</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
