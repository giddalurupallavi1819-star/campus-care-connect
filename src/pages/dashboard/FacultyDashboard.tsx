import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard, RiskBadge, SectionHeader } from '@/components/dashboard/SharedComponents';
import { mockStudents, mockAlerts, mockAttendanceChart } from '@/lib/mock-data';
import { Users, AlertTriangle, TrendingDown, CheckCircle, Bell } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function FacultyDashboard() {
  const highRiskCount = mockStudents.filter(s => s.riskLevel === 'high' || s.riskLevel === 'critical').length;

  return (
    <div className="space-y-6">
      <SectionHeader title="Faculty Overview" description="Monitor your assigned students and track interventions" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <MetricCard title="Total Students" value={mockStudents.length} icon={Users} variant="default" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <MetricCard title="At-Risk Students" value={highRiskCount} icon={AlertTriangle} variant="danger" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <MetricCard title="Avg Attendance" value="74%" icon={TrendingDown} variant="warning" trend={{ value: 5, isPositive: false }} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <MetricCard title="Active Alerts" value={mockAlerts.filter(a => !a.isRead).length} icon={Bell} variant="danger" />
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader><CardTitle className="font-display text-base">Student Risk Overview</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>GPA</TableHead>
                    <TableHead>Risk</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockStudents.map(s => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell className="text-muted-foreground">{s.department}</TableCell>
                      <TableCell>{s.attendance}%</TableCell>
                      <TableCell>{s.gpa}</TableCell>
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
              {mockAlerts.slice(0, 4).map(a => (
                <div key={a.id} className={`rounded-lg border p-3 ${a.severity === 'critical' ? 'border-destructive/30 bg-destructive/5' : 'border-border'}`}>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className={`mt-0.5 h-4 w-4 shrink-0 ${a.severity === 'critical' ? 'text-destructive' : 'text-warning'}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{a.studentName}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{a.message}</p>
                      <p className="text-xs text-muted-foreground/60 mt-1">{a.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="font-display text-base">Attendance Trend</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockAttendanceChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
              <Bar dataKey="attendance" fill="hsl(217, 71%, 30%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
