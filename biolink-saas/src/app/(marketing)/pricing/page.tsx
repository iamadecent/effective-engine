import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

export default function PricingPage() {
  return (
    <div className="container mx-auto py-20">
      <h1 className="text-4xl font-bold text-center">Pricing</h1>
      <p className="text-lg text-muted-foreground text-center mt-2">
        Choose the plan that's right for you.
      </p>
      <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>For getting started</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">$0<span className="text-lg font-normal text-muted-foreground">/month</span></p>
            <ul className="mt-6 space-y-2">
              <li>✓ Basic Links</li>
              <li>✓ Basic Analytics</li>
            </ul>
            <Button variant="outline" className="w-full mt-6">Get Started</Button>
          </CardContent>
        </Card>
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>For creators and businesses</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">$10<span className="text-lg font-normal text-muted-foreground">/month</span></p>
            <ul className="mt-6 space-y-2">
              <li>✓ Everything in Free</li>
              <li>✓ Advanced Customization</li>
              <li>✓ Advanced Analytics</li>
              <li>✓ Email List Builder</li>
              <li>✓ Shoppable Links</li>
            </ul>
            <Button className="w-full mt-6">Upgrade to Pro</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
