import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

const ChartPlaceholder = () => (
    <div className="h-80 w-full bg-muted/50 dark:bg-muted/50 rounded-lg flex items-center justify-center p-4">
        <svg width="100%" height="100%" className="text-muted/50">
            <defs>
                <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <path d="M 10 250 C 40 200, 80 150, 120 180 S 200 220, 240 170 S 320 100, 360 130" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
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
                        <CardDescription>A detailed look at your link performance.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartPlaceholder />
                    </CardContent>
                </Card>
                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Referrers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Data not available in this demo.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Geographic Data</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Data not available in this demo.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
