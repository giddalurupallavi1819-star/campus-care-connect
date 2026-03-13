import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { SectionHeader, MetricCard } from '@/components/dashboard/SharedComponents';
import { Heart, Frown, Smile, Meh, Moon } from 'lucide-react';
import { toast } from 'sonner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockMoodTrend } from '@/lib/mock-data';

export default function StudentWellness() {
  const [moodScore, setMoodScore] = useState([5]);
  const [stressLevel, setStressLevel] = useState([5]);
  const [sleepHours, setSleepHours] = useState([7]);
  const [notes, setNotes] = useState('');

  const getMoodEmoji = (score: number) => {
    if (score <= 3) return <Frown className="h-8 w-8 text-destructive" />;
    if (score <= 6) return <Meh className="h-8 w-8 text-warning" />;
    return <Smile className="h-8 w-8 text-success" />;
  };

  const handleSubmit = () => {
    toast.success('Mood check-in submitted! Take care of yourself 💙');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="My Wellness" description="Track your mood, stress, and sleep patterns" />

      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard title="Current Mood" value={`${moodScore[0]}/10`} icon={Heart} variant={moodScore[0] > 6 ? 'success' : moodScore[0] > 3 ? 'warning' : 'danger'} />
        <MetricCard title="Stress Level" value={`${stressLevel[0]}/10`} icon={Heart} variant={stressLevel[0] < 4 ? 'success' : stressLevel[0] < 7 ? 'warning' : 'danger'} />
        <MetricCard title="Sleep" value={`${sleepHours[0]}h`} icon={Moon} variant={sleepHours[0] >= 7 ? 'success' : sleepHours[0] >= 5 ? 'warning' : 'danger'} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display text-base">Daily Mood Check-in</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">{getMoodEmoji(moodScore[0])}</div>
            <div>
              <Label>Mood Score: {moodScore[0]}/10</Label>
              <Slider value={moodScore} onValueChange={setMoodScore} min={1} max={10} step={1} className="mt-2" />
            </div>
            <div>
              <Label>Stress Level: {stressLevel[0]}/10</Label>
              <Slider value={stressLevel} onValueChange={setStressLevel} min={1} max={10} step={1} className="mt-2" />
            </div>
            <div>
              <Label>Sleep Hours: {sleepHours[0]}h</Label>
              <Slider value={sleepHours} onValueChange={setSleepHours} min={0} max={12} step={0.5} className="mt-2" />
            </div>
            <div>
              <Label>Notes (optional)</Label>
              <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="How are you feeling today?" className="mt-2" />
            </div>
            <Button className="w-full" onClick={handleSubmit}>Submit Check-in</Button>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display text-base">Mood History</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={mockMoodTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 10]} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="mood" stroke="hsl(142, 71%, 35%)" strokeWidth={2} name="Mood" />
                <Line type="monotone" dataKey="stress" stroke="hsl(0, 72%, 51%)" strokeWidth={2} name="Stress" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
