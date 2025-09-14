'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
// import { useTheme } from 'next-themes'; // Cannot install
import { cn } from '@/lib/utils';

// This would be a real component for a real file uploader
const Uploader = ({ onUpload }: { onUpload: (url: string) => void }) => (
    <Button type="button" variant="outline" onClick={() => onUpload(`https://source.unsplash.com/random/1200x800?sig=${Date.now()}`)}>
        Upload Image
    </Button>
);

export default function ThemeEditor({ initialTheme }: { initialTheme: any }) {
    const [theme, setTheme] = useState(initialTheme);
    // const { setTheme: setGlobalTheme } = useTheme();

    const handleSave = async () => {
        // const res = await fetch('/api/theme', {
        //     method: 'PUT',
        //     body: JSON.stringify(theme),
        // });
        // if (res.ok) { ... }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Theme & Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label>Background Color</Label>
                    <Input type="color" value={theme.backgroundColor} onChange={e => setTheme({...theme, backgroundColor: e.target.value})} />
                </div>
                <div className="space-y-2">
                    <Label>Background Image</Label>
                    <Uploader onUpload={(url) => setTheme({...theme, backgroundImageUrl: url})} />
                </div>
                <div className="space-y-2">
                    <Label>Button Style</Label>
                    <Select value={theme.buttonStyle} onValueChange={value => setTheme({...theme, buttonStyle: value})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="rounded">Rounded</SelectItem>
                            <SelectItem value="pill">Pill</SelectItem>
                            <SelectItem value="square">Square</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Font Family</Label>
                    <Select value={theme.fontFamily} onValueChange={value => setTheme({...theme, fontFamily: value})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Inter">Inter (Sans)</SelectItem>
                            <SelectItem value="Roboto">Roboto (Sans)</SelectItem>
                            <SelectItem value="Montserrat">Montserrat (Sans)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={handleSave}>Save Theme</Button>
            </CardContent>
        </Card>
    );
}
