import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard, RiskBadge, SectionHeader } from '@/components/dashboard/SharedComponents';
import { mockStudents, mockAlerts, mockRiskDistribution, mockDepartmentRisk } from '@/lib/mock-data';
import { Users, AlertTriangle, BarChart3, Shield, GraduationCap, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Campus Intelligence Dashboard" description="Real-time analytics and campus-wide monitoring" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <MetricCard title="Total Students" value="1,247" icon={GraduationCap} variant="default" trend={{ value: 5, isPositive: true }} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <MetricCard title="At-Risk Students" value="127" icon={AlertTriangle} variant="danger" trend={{ value: 12, isPositive: false }} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <MetricCard title="Active Alerts" value="34" icon={Shield} variant="warning" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <MetricCard title="Interventions" value="89" icon={Activity} variant="success" subtitle="This semester" />
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display text-base">Risk Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={mockRiskDistribution} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                  {mockRiskDistribution.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display text-base">Department-wise Risk Heatmap</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockDepartmentRisk}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="department" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="lowRisk" stackId="a" fill="hsl(142, 71%, 35%)" name="Low" />
                <Bar dataKey="mediumRisk" stackId="a" fill="hsl(38, 92%, 50%)" name="Medium" />
                <Bar dataKey="highRisk" stackId="a" fill="hsl(15, 80%, 50%)" name="High" />
                <Bar dataKey="critical" stackId="a" fill="hsl(0, 72%, 51%)" name="Critical" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="font-display text-base">All Students Overview</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>GPA</TableHead>
                  <TableHead>Mood</TableHead>
                  <TableHead>Stress</TableHead>
                  <TableHead>Risk Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockStudents.map(s => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell className="text-muted-foreground">{s.department}</TableCell>
                    <TableCell>{s.attendance}%</TableCell>
                    <TableCell>{s.gpa}</TableCell>
                    <TableCell>{s.moodScore}/10</TableCell>
                    <TableCell>{s.stressLevel}/10</TableCell>
                    <TableCell><RiskBadge level={s.riskLevel} score={s.riskScore} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="font-display text-base">Recent Alerts</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAlerts.map(a => (
              <div key={a.id} className={`flex items-start gap-3 rounded-lg border p-3 ${a.severity === 'critical' ? 'border-destructive/30 bg-destructive/5' : a.severity === 'high' ? 'border-warning/30 bg-warning/5' : 'border-border'}`}>
                <AlertTriangle className={`mt-0.5 h-4 w-4 shrink-0 ${a.severity === 'critical' ? 'text-destructive' : 'text-warning'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{a.studentName}</span>
                    <RiskBadge level={a.severity} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.message}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
