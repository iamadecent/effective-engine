import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

export default function BillingPage() {
    // This page would fetch the user's subscription status from the database.
    const subscription = {
        plan: "Pro",
        status: "active",
        currentPeriodEnd: new Date().toLocaleDateString(),
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Billing & Subscription</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Your Plan</CardTitle>
                    <CardDescription>
                        You are currently on the <span className="font-bold">{subscription.plan}</span> plan.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Your subscription is currently {subscription.status} and will renew on {subscription.currentPeriodEnd}.</p>
                    <div className="mt-6">
                        <Button>Manage Subscription</Button>
                        {/* This button would link to a Stripe customer portal session */}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
