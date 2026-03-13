import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SectionHeader } from '@/components/dashboard/SharedComponents';
import { Send, Bot, User, Brain } from 'lucide-react';
import { chatbotResponses } from '@/lib/mock-data';
import { motion } from 'framer-motion';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

function detectSentiment(message: string): string {
  const lower = message.toLowerCase();
  if (lower.match(/stress|overwhelm|pressure|anxious|worry|nervous/)) return 'stressed';
  if (lower.match(/sad|depress|lonely|hopeless|cry|unhappy/)) return 'sad';
  if (lower.match(/anxious|anxiety|panic|fear|scared/)) return 'anxious';
  return 'default';
}

export default function AIChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', text: chatbotResponses.default, sender: 'ai', timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), text: input, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const sentiment = detectSentiment(input);
      const response = chatbotResponses[sentiment] || chatbotResponses.default;
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), text: response, sender: 'ai', timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
      setTyping(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <SectionHeader title="AI Wellness Chatbot" description="Chat anonymously about your wellbeing. Everything is confidential." />

      <Card className="shadow-card h-[600px] flex flex-col">
        <CardHeader className="border-b border-border pb-3">
          <CardTitle className="font-display text-base flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-accent">
              <Brain className="h-4 w-4 text-accent-foreground" />
            </div>
            CampusGuardian Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}
              >
                {msg.sender === 'ai' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-muted text-foreground rounded-bl-md'
                }`}>
                  <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{
                    __html: msg.text
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n/g, '<br/>')
                  }} />
                </div>
                {msg.sender === 'user' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <User className="h-4 w-4 text-accent" />
                  </div>
                )}
              </motion.div>
            ))}
            {typing && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="border-t border-border p-4">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <Input
                placeholder="How are you feeling today?"
                value={input}
                onChange={e => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground/60 mt-2 text-center">🔒 This conversation is anonymous and confidential</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
