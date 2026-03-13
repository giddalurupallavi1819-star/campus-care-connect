export interface StudentData {
  attendanceRate: number; // 0-100
  gpa: number; // 0-10
  assignmentRate: number; // 0-100
  moodScore: number; // 1-10
  stressLevel: number; // 1-10
  sleepHours: number; // 0-12
  activityCount: number; // number of activities
  backlogs: number;
}

export interface RiskResult {
  overallScore: number;
  dropoutRisk: number;
  burnoutRisk: number;
  stressRisk: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  reasons: string[];
  suggestedActions: string[];
}

export function calculateRiskScore(data: StudentData): RiskResult {
  const reasons: string[] = [];
  const suggestedActions: string[] = [];

  // Attendance component (40% weight)
  let attendanceRisk = 0;
  if (data.attendanceRate < 50) {
    attendanceRisk = 95;
    reasons.push(`Critically low attendance at ${data.attendanceRate}%`);
    suggestedActions.push('Immediate intervention required: Schedule mandatory meeting with faculty mentor');
  } else if (data.attendanceRate < 65) {
    attendanceRisk = 75;
    reasons.push(`Attendance dropped to ${data.attendanceRate}%, below acceptable threshold`);
    suggestedActions.push('Schedule counselling session and assign academic mentor');
  } else if (data.attendanceRate < 75) {
    attendanceRisk = 50;
    reasons.push(`Attendance at ${data.attendanceRate}% needs improvement`);
    suggestedActions.push('Send attendance warning notification');
  } else if (data.attendanceRate < 85) {
    attendanceRisk = 25;
  }

  // Academic component (30% weight)
  let academicRisk = 0;
  if (data.gpa < 3) {
    academicRisk = 90;
    reasons.push(`GPA critically low at ${data.gpa}`);
    suggestedActions.push('Assign academic tutor and create study plan');
  } else if (data.gpa < 5) {
    academicRisk = 65;
    reasons.push(`Two or more failed subjects detected (GPA: ${data.gpa})`);
    suggestedActions.push('Recommend academic support resources');
  } else if (data.gpa < 7) {
    academicRisk = 35;
  }

  if (data.backlogs > 2) {
    academicRisk = Math.min(100, academicRisk + 20);
    reasons.push(`${data.backlogs} course backlogs detected`);
    suggestedActions.push('Create backlog clearance plan with department');
  }

  if (data.assignmentRate < 50) {
    academicRisk = Math.min(100, academicRisk + 15);
    reasons.push(`Assignment submission rate at ${data.assignmentRate}%`);
  }

  // Mood/Stress component (20% weight)
  let moodRisk = 0;
  const stressNorm = (data.stressLevel / 10) * 100;
  const moodNorm = ((10 - data.moodScore) / 10) * 100;
  moodRisk = (stressNorm * 0.6 + moodNorm * 0.4);

  if (data.stressLevel >= 8) {
    reasons.push(`Severe stress level reported (${data.stressLevel}/10)`);
    suggestedActions.push('Urgent: Connect with counselor for stress management');
  } else if (data.stressLevel >= 6) {
    reasons.push(`Elevated stress levels detected (${data.stressLevel}/10)`);
    suggestedActions.push('Recommend stress management workshops');
  }

  if (data.moodScore <= 3) {
    reasons.push(`Very low mood score (${data.moodScore}/10)`);
    suggestedActions.push('Priority counseling session recommended');
  }

  if (data.sleepHours < 5) {
    moodRisk = Math.min(100, moodRisk + 15);
    reasons.push(`Insufficient sleep (${data.sleepHours} hrs/night)`);
    suggestedActions.push('Provide sleep hygiene resources');
  }

  // Activity component (10% weight)
  let activityRisk = 0;
  if (data.activityCount === 0) {
    activityRisk = 80;
    reasons.push('No campus activity participation detected');
    suggestedActions.push('Encourage participation in clubs and campus events');
  } else if (data.activityCount < 2) {
    activityRisk = 40;
    reasons.push('Low campus engagement');
  }

  // Calculate weighted overall score
  const overallScore = Math.round(
    attendanceRisk * 0.4 +
    academicRisk * 0.3 +
    moodRisk * 0.2 +
    activityRisk * 0.1
  );

  const dropoutRisk = Math.round(attendanceRisk * 0.5 + academicRisk * 0.4 + activityRisk * 0.1);
  const burnoutRisk = Math.round(academicRisk * 0.4 + moodRisk * 0.4 + activityRisk * 0.2);
  const stressRisk = Math.round(moodRisk * 0.7 + academicRisk * 0.2 + attendanceRisk * 0.1);

  let riskLevel: RiskResult['riskLevel'] = 'low';
  if (overallScore > 80) riskLevel = 'critical';
  else if (overallScore > 60) riskLevel = 'high';
  else if (overallScore > 40) riskLevel = 'medium';

  if (reasons.length === 0) reasons.push('All indicators within normal range');
  if (suggestedActions.length === 0) suggestedActions.push('Continue monitoring - no immediate action needed');

  return { overallScore, dropoutRisk, burnoutRisk, stressRisk, riskLevel, reasons, suggestedActions };
}

export function getRiskColor(level: string): string {
  switch (level) {
    case 'critical': return 'risk-critical';
    case 'high': return 'risk-high';
    case 'medium': return 'risk-medium';
    default: return 'risk-low';
  }
}

export function getRiskBgClass(level: string): string {
  switch (level) {
    case 'critical': return 'bg-destructive/10 text-destructive border-destructive/20';
    case 'high': return 'bg-warning/10 text-warning border-warning/20';
    case 'medium': return 'bg-info/10 text-info border-info/20';
    default: return 'bg-success/10 text-success border-success/20';
  }
}
