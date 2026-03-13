import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard, RiskBadge, SectionHeader } from '@/components/dashboard/SharedComponents';
import { mockStudents, mockAlerts, mockCounselingSessions, mockMoodTrend } from '@/lib/mock-data';
import { Heart, AlertTriangle, Calendar, Brain, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { calculateRiskScore, type StudentData } from '@/lib/risk-engine';

export default function CounselorDashboard() {
  const criticalStudents = mockStudents.filter(s => s.riskLevel === 'high' || s.riskLevel === 'critical');

  // Demonstrate explainable AI for first critical student
  const sampleData: StudentData = {
    attendanceRate: 58, gpa: 4.2, assignmentRate: 45, moodScore: 3,
    stressLevel: 8, sleepHours: 4, activityCount: 0, backlogs: 3,
  };
  const riskResult = calculateRiskScore(sampleData);

  return (
    <div className="space-y-6">
      <SectionHeader title="Counselor Dashboard" description="Monitor student wellbeing and manage interventions" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <MetricCard title="High Risk Students" value={criticalStudents.length} icon={AlertTriangle} variant="danger" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <MetricCard title="Pending Sessions" value={mockCounselingSessions.filter(s => s.status === 'scheduled').length} icon={Calendar} variant="info" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <MetricCard title="Completed Sessions" value="12" icon={CheckCircle} variant="success" subtitle="This month" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <MetricCard title="Active Alerts" value={mockAlerts.filter(a => !a.isRead).length} icon={Heart} variant="warning" />
        </motion.div>
      </div>

      {/* Explainable AI Section */}
      <Card className="shadow-card border-destructive/20">
        <CardHeader>
          <CardTitle className="font-display text-base flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Risk Analysis — Explainable Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display text-lg font-bold text-foreground">{mockStudents[1]?.name}</span>
                <RiskBadge level={riskResult.riskLevel} score={riskResult.overallScore} />
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="rounded-lg bg-destructive/5 p-3 text-center border border-destructive/10">
                  <p className="text-xs text-muted-foreground">Dropout</p>
                  <p className="font-display text-xl font-bold text-destructive">{riskResult.dropoutRisk}%</p>
                </div>
                <div className="rounded-lg bg-warning/5 p-3 text-center border border-warning/10">
                  <p className="text-xs text-muted-foreground">Burnout</p>
                  <p className="font-display text-xl font-bold text-warning">{riskResult.burnoutRisk}%</p>
                </div>
                <div className="rounded-lg bg-info/5 p-3 text-center border border-info/10">
                  <p className="text-xs text-muted-foreground">Stress</p>
                  <p className="font-display text-xl font-bold text-info">{riskResult.stressRisk}%</p>
                </div>
              </div>
              <div className="rounded-lg bg-destructive/5 p-4 border border-destructive/10">
                <p className="font-semibold text-sm text-foreground mb-2">📊 Why this student is at risk:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {riskResult.reasons.map((r, i) => <li key={i}>• {r}</li>)}
                </ul>
              </div>
            </div>
            <div>
              <div className="rounded-lg bg-primary/5 p-4 border border-primary/10 h-full">
                <p className="font-semibold text-sm text-foreground mb-2">💡 Recommended Interventions:</p>
                <ul className="space-y-2">
                  {riskResult.suggestedActions.map((a, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-success shrink-0" />
                      <span className="text-sm text-muted-foreground">{a}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-4" size="sm">Schedule Intervention</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display text-base">High-Risk Students</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Mood</TableHead>
                  <TableHead>Stress</TableHead>
                  <TableHead>Risk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {criticalStudents.map(s => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell>{s.moodScore}/10</TableCell>
                    <TableCell>{s.stressLevel}/10</TableCell>
                    <TableCell><RiskBadge level={s.riskLevel} score={s.riskScore} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display text-base">Upcoming Sessions</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockCounselingSessions.map(s => (
                <div key={s.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.studentName}</p>
                    <p className="text-xs text-muted-foreground">{s.date} at {s.time}</p>
                  </div>
                  <Badge variant={s.status === 'completed' ? 'secondary' : 'default'}>{s.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="font-display text-base">Campus Mood Trend</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockMoodTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} domain={[0, 10]} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="mood" stroke="hsl(142, 71%, 35%)" strokeWidth={2} name="Avg Mood" />
              <Line type="monotone" dataKey="stress" stroke="hsl(0, 72%, 51%)" strokeWidth={2} name="Avg Stress" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
