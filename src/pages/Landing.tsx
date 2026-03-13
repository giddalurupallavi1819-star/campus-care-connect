import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Brain, Bell, BarChart3, MessageCircle, Users, ArrowRight, CheckCircle, Activity } from 'lucide-react';

const features = [
  { icon: Brain, title: 'AI Risk Prediction', desc: 'Explainable AI that predicts dropout, burnout, and stress risks with actionable recommendations' },
  { icon: Bell, title: 'Early Warning Alerts', desc: 'Automatic notifications when students cross risk thresholds, enabling timely intervention' },
  { icon: BarChart3, title: 'Smart Analytics', desc: 'Campus-wide dashboards with risk heatmaps, attendance trends, and performance insights' },
  { icon: MessageCircle, title: 'AI Wellness Chatbot', desc: 'Anonymous mental health support with sentiment detection and counseling resources' },
  { icon: Users, title: 'Role-Based Access', desc: 'Dedicated dashboards for students, faculty mentors, counselors, and administrators' },
  { icon: Activity, title: 'Behavioral Tracking', desc: 'Monitor attendance, mood patterns, sleep quality, and campus engagement' },
];

const outcomes = [
  'Early identification of at-risk students',
  'Proactive counselling and mentoring support',
  'Data-driven campus decision making',
  'Explainable AI with intervention recommendations',
  'Safer, smarter campus ecosystem',
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full glass border-b border-border/50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-accent">
              <Shield className="h-5 w-5 text-accent-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">CampusGuardian <span className="text-gradient">AI</span></span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => navigate('/auth')}>Sign In</Button>
            <Button onClick={() => navigate('/auth')} className="gradient-accent border-0 text-accent-foreground hover:opacity-90">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="gradient-hero py-24 lg:py-36">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="mb-4 inline-block rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-primary-foreground">
                🛡️ AI-Powered Student Safety Platform
              </span>
              <h1 className="font-display text-4xl font-extrabold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl">
                Early Warning &<br />
                <span className="text-gradient">Support System</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80">
                Detect students at risk of academic failure, mental stress, or dropout using predictive analytics. 
                Provide timely support with explainable AI and smart intervention recommendations.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" onClick={() => navigate('/auth')} className="gradient-accent border-0 text-accent-foreground text-lg px-8 hover:opacity-90">
                  Launch Platform <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                  Explore Features
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-foreground">Powerful Features</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Built to help colleges detect early signs of distress and provide timely support</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full border-border/50 shadow-card hover:shadow-card-hover transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <f.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{f.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Explainable AI Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground">Explainable AI with Smart Interventions</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Our system doesn't just predict risk — it explains <strong>why</strong> a student is classified as high risk 
                and suggests appropriate interventions automatically.
              </p>
              <ul className="mt-6 space-y-3">
                {outcomes.map(o => (
                  <li key={o} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 text-success shrink-0" />
                    <span className="text-foreground">{o}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="shadow-card-hover border-border/50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-destructive animate-pulse-glow" />
                    <span className="font-display font-bold text-destructive">Risk Level: High (Score: 78)</span>
                  </div>
                  <div className="rounded-lg bg-destructive/5 p-4 border border-destructive/10">
                    <p className="font-semibold text-foreground mb-2">📊 Reasons:</p>
                    <ul className="text-sm text-muted-foreground space-y-1.5">
                      <li>• Attendance dropped by 30% in last 4 weeks</li>
                      <li>• Two failed subjects detected (GPA: 4.2)</li>
                      <li>• Severe stress level reported (8/10)</li>
                      <li>• No campus activity participation</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-primary/5 p-4 border border-primary/10">
                    <p className="font-semibold text-foreground mb-2">💡 Suggested Actions:</p>
                    <ul className="text-sm text-muted-foreground space-y-1.5">
                      <li>• Schedule counselling session immediately</li>
                      <li>• Assign academic mentor for study support</li>
                      <li>• Recommend stress management workshop</li>
                      <li>• Encourage campus activity participation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground">Ready to Transform Student Safety?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Join colleges using AI-powered early warning systems to create safer, smarter campuses.</p>
          <Button size="lg" onClick={() => navigate('/auth')} className="mt-8 gradient-accent border-0 text-accent-foreground text-lg px-8 hover:opacity-90">
            Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 CampusGuardian AI. Built for smarter, safer campuses.</p>
        </div>
      </footer>
    </div>
  );
}
