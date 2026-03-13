// Mock data for dashboard demonstrations
export const mockStudents = [
  { id: '1', name: 'Aanya Sharma', department: 'Computer Science', attendance: 92, gpa: 8.5, riskScore: 15, riskLevel: 'low' as const, moodScore: 8, stressLevel: 3 },
  { id: '2', name: 'Rahul Patel', department: 'Mechanical Eng.', attendance: 58, gpa: 4.2, riskScore: 78, riskLevel: 'high' as const, moodScore: 3, stressLevel: 8 },
  { id: '3', name: 'Priya Mehta', department: 'Electronics', attendance: 71, gpa: 6.1, riskScore: 52, riskLevel: 'medium' as const, moodScore: 5, stressLevel: 6 },
  { id: '4', name: 'Arjun Singh', department: 'Civil Eng.', attendance: 45, gpa: 3.8, riskScore: 88, riskLevel: 'critical' as const, moodScore: 2, stressLevel: 9 },
  { id: '5', name: 'Sneha Reddy', department: 'Computer Science', attendance: 85, gpa: 7.8, riskScore: 22, riskLevel: 'low' as const, moodScore: 7, stressLevel: 4 },
  { id: '6', name: 'Vikram Joshi', department: 'Information Tech.', attendance: 63, gpa: 5.0, riskScore: 65, riskLevel: 'high' as const, moodScore: 4, stressLevel: 7 },
  { id: '7', name: 'Kavita Nair', department: 'Biotechnology', attendance: 88, gpa: 8.2, riskScore: 18, riskLevel: 'low' as const, moodScore: 8, stressLevel: 2 },
  { id: '8', name: 'Deepak Kumar', department: 'Mechanical Eng.', attendance: 52, gpa: 4.5, riskScore: 72, riskLevel: 'high' as const, moodScore: 3, stressLevel: 8 },
];

export const mockAlerts = [
  { id: '1', studentName: 'Arjun Singh', severity: 'critical' as const, message: 'Attendance dropped below 50%. Immediate intervention required.', type: 'attendance_drop', time: '2 hours ago', isRead: false },
  { id: '2', studentName: 'Rahul Patel', severity: 'high' as const, message: 'Risk score exceeded 70. Academic performance declining.', type: 'risk_threshold', time: '5 hours ago', isRead: false },
  { id: '3', studentName: 'Vikram Joshi', severity: 'high' as const, message: 'Severe stress level reported in mood survey.', type: 'mood_decline', time: '1 day ago', isRead: true },
  { id: '4', studentName: 'Deepak Kumar', severity: 'high' as const, message: 'Multiple failed subjects detected. Academic support needed.', type: 'academic_decline', time: '1 day ago', isRead: false },
  { id: '5', studentName: 'Priya Mehta', severity: 'medium' as const, message: 'Attendance trending downward over past 2 weeks.', type: 'attendance_drop', time: '2 days ago', isRead: true },
];

export const mockAttendanceChart = [
  { month: 'Jan', attendance: 88 },
  { month: 'Feb', attendance: 85 },
  { month: 'Mar', attendance: 82 },
  { month: 'Apr', attendance: 79 },
  { month: 'May', attendance: 75 },
  { month: 'Jun', attendance: 78 },
];

export const mockRiskDistribution = [
  { name: 'Low Risk', value: 45, fill: 'hsl(142, 71%, 35%)' },
  { name: 'Medium Risk', value: 25, fill: 'hsl(38, 92%, 50%)' },
  { name: 'High Risk', value: 20, fill: 'hsl(15, 80%, 50%)' },
  { name: 'Critical', value: 10, fill: 'hsl(0, 72%, 51%)' },
];

export const mockDepartmentRisk = [
  { department: 'CS', lowRisk: 40, mediumRisk: 30, highRisk: 20, critical: 10 },
  { department: 'Mech', lowRisk: 25, mediumRisk: 35, highRisk: 25, critical: 15 },
  { department: 'ECE', lowRisk: 50, mediumRisk: 25, highRisk: 15, critical: 10 },
  { department: 'Civil', lowRisk: 30, mediumRisk: 30, highRisk: 25, critical: 15 },
  { department: 'IT', lowRisk: 45, mediumRisk: 28, highRisk: 18, critical: 9 },
  { department: 'Biotech', lowRisk: 55, mediumRisk: 25, highRisk: 15, critical: 5 },
];

export const mockMoodTrend = [
  { week: 'W1', mood: 7, stress: 4 },
  { week: 'W2', mood: 6, stress: 5 },
  { week: 'W3', mood: 5, stress: 6 },
  { week: 'W4', mood: 6, stress: 5 },
  { week: 'W5', mood: 7, stress: 4 },
  { week: 'W6', mood: 5, stress: 7 },
];

export const mockCounselingSessions = [
  { id: '1', studentName: 'Arjun Singh', date: '2026-03-15', time: '10:00 AM', status: 'scheduled' },
  { id: '2', studentName: 'Rahul Patel', date: '2026-03-14', time: '2:00 PM', status: 'completed' },
  { id: '3', studentName: 'Vikram Joshi', date: '2026-03-16', time: '11:00 AM', status: 'scheduled' },
];

export const chatbotResponses: Record<string, string> = {
  stressed: "I understand you're feeling stressed. That's completely normal, especially during exams. Here are some things that might help:\n\n🧘 **Deep breathing**: Try 4-7-8 breathing (inhale 4s, hold 7s, exhale 8s)\n📚 **Study breaks**: Take 10-min breaks every 45 minutes\n🏃 **Physical activity**: Even a short walk can reduce stress\n💤 **Sleep**: Aim for 7-8 hours\n\nWould you like me to help you book a counseling session?",
  sad: "I'm sorry you're feeling this way. Your feelings are valid. Remember:\n\n💙 It's okay to not be okay\n🗣️ Talking to someone can help enormously\n📞 Campus counseling is free and confidential\n🌟 This feeling is temporary\n\nWould you like to talk to a counselor? I can help schedule an appointment.",
  anxious: "Anxiety can feel overwhelming, but there are strategies that help:\n\n🌬️ **Grounding technique**: Name 5 things you see, 4 you hear, 3 you touch\n✍️ **Journaling**: Write down your worries\n🎯 **Break tasks down**: Focus on one small step at a time\n🧘 **Mindfulness**: Try a 5-minute guided meditation\n\nYour campus wellness center has anxiety support groups too!",
  default: "Thank you for reaching out! I'm here to support your wellbeing. I can help with:\n\n😊 **Mood tracking** - Log how you're feeling\n📊 **Stress management** - Tips and resources\n📅 **Counseling** - Book a session\n📚 **Academic support** - Study resources\n\nHow are you feeling today? You can tell me anything - this conversation is confidential.",
};
