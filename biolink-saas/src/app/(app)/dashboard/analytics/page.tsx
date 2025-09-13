import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const ChartPlaceholder = () => (
    <div className="h-80 w-full bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Chart Placeholder</p>
    </div>
);

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Advanced Analytics</h1>
            <div className="grid gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Clicks Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartPlaceholder />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Top Referrers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Placeholder for referrer data.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
