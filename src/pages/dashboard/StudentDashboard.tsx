import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard, RiskBadge, SectionHeader } from '@/components/dashboard/SharedComponents';
import { mockMoodTrend, mockAttendanceChart } from '@/lib/mock-data';
import { Activity, BookOpen, Brain, Heart, TrendingUp, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <SectionHeader title="Welcome Back!" description="Here's your wellness and academic overview" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
          <MetricCard title="Wellness Score" value="72/100" icon={Heart} variant="success" subtitle="Good condition" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <MetricCard title="Attendance" value="85%" icon={Calendar} variant="info" trend={{ value: 3, isPositive: false }} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <MetricCard title="GPA" value="7.8" icon={BookOpen} variant="default" subtitle="Semester 5" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <MetricCard title="Risk Level" value="Low" icon={Brain} variant="success" />
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display text-base">Attendance Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={mockAttendanceChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="attendance" stroke="hsl(174, 60%, 40%)" fill="hsl(174, 60%, 40%)" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display text-base">Mood & Stress Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={mockMoodTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" domain={[0, 10]} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="mood" stroke="hsl(142, 71%, 35%)" strokeWidth={2} dot={{ r: 4 }} name="Mood" />
                <Line type="monotone" dataKey="stress" stroke="hsl(0, 72%, 51%)" strokeWidth={2} dot={{ r: 4 }} name="Stress" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display text-base">Quick Actions</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/dashboard/student/wellness')}>
              <Heart className="mr-2 h-4 w-4" /> Submit Mood Check-in
            </Button>
            <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/dashboard/student/chatbot')}>
              <Brain className="mr-2 h-4 w-4" /> Talk to AI Counselor
            </Button>
            <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/dashboard/student/appointments')}>
              <Calendar className="mr-2 h-4 w-4" /> Book Counseling Session
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display text-base">Recent Activities</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Coding Club Meeting', 'Basketball Practice', 'Guest Lecture'].map(a => (
                <div key={a} className="flex items-center gap-3 rounded-lg p-2 bg-muted/50">
                  <Activity className="h-4 w-4 text-accent" />
                  <span className="text-sm text-foreground">{a}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display text-base">Stress Resources</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: '4-7-8 Breathing', desc: 'Calming technique' },
                { title: 'Study Break Timer', desc: '45min work, 10min rest' },
                { title: 'Sleep Hygiene Tips', desc: 'Better sleep quality' },
              ].map(r => (
                <div key={r.title} className="rounded-lg border border-border p-3">
                  <p className="text-sm font-medium text-foreground">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
