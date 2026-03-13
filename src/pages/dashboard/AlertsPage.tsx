import { SectionHeader } from '@/components/dashboard/SharedComponents';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockAlerts } from '@/lib/mock-data';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { RiskBadge } from '@/components/dashboard/SharedComponents';
import { Button } from '@/components/ui/button';

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Alerts & Notifications" description="Monitor and manage student risk alerts" />
      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {mockAlerts.map(a => (
              <div key={a.id} className={`flex items-start gap-4 p-4 ${!a.isRead ? 'bg-muted/30' : ''}`}>
                <AlertTriangle className={`mt-0.5 h-5 w-5 shrink-0 ${a.severity === 'critical' ? 'text-destructive' : a.severity === 'high' ? 'text-warning' : 'text-info'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-foreground">{a.studentName}</span>
                    <RiskBadge level={a.severity} />
                    <span className="text-xs text-muted-foreground ml-auto">{a.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{a.message}</p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm" variant="ghost"><CheckCircle className="mr-1 h-3 w-3" /> Mark Read</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
