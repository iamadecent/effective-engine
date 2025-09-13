import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="container mx-auto text-center py-20">
      <h1 className="text-5xl font-bold">Your One Link for Everything</h1>
      <p className="text-xl text-muted-foreground mt-4">
        Share all your content, products, and social profiles with a single link.
      </p>
      <div className="mt-8">
        <Link href="/login">
          <Button size="lg">Get Started for Free</Button>
        </Link>
      </div>
    </div>
  );
}
