import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Icons ---
const Icons = {
  Spark: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#E8600A" stroke="#E8600A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Phone: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.6 21 3 14.4 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#E8600A"/>
    </svg>
  ),
  Chat: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill="#E8600A"/>
    </svg>
  ),
  Sync: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" fill="#E8600A"/>
    </svg>
  ),
  Database: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="5" rx="9" ry="3" stroke="#E8600A" strokeWidth="2" fill="none"/>
      <path d="M21 5v4c0 1.66-4.03 3-9 3S3 10.66 3 9V5" stroke="#E8600A" strokeWidth="2" fill="none"/>
      <path d="M21 9v4c0 1.66-4.03 3-9 3S3 14.66 3 13V9" stroke="#E8600A" strokeWidth="2" fill="none"/>
      <path d="M21 13v4c0 1.66-4.03 3-9 3S3 18.66 3 17v-4" stroke="#E8600A" strokeWidth="2" fill="none"/>
    </svg>
  ),
  Funnel: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path d="M3 4h18v2l-7 7v7l-4-2v-5L3 6V4z" stroke="#E8600A" strokeWidth="2" fill="none" strokeLinejoin="round"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="17" rx="2" stroke="#E8600A" strokeWidth="2" fill="none"/>
      <path d="M16 2v4M8 2v4M3 10h18" stroke="#E8600A" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 14h2m0 0v2m0-2l2-2" stroke="#E8600A" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Bell: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="#E8600A" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  Chart: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="12" width="4" height="9" rx="1" fill="#E8600A"/>
      <rect x="10" y="7" width="4" height="14" rx="1" fill="#E8600A"/>
      <rect x="17" y="3" width="4" height="18" rx="1" fill="#E8600A"/>
    </svg>
  ),
  Dashboard: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="#E8600A" strokeWidth="2" fill="none"/>
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="#E8600A" strokeWidth="2" fill="none"/>
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="#E8600A" strokeWidth="2" fill="none"/>
      <rect x="14" y="14" width="7" height="7" rx="1" stroke="#E8600A" strokeWidth="2" fill="none"/>
    </svg>
  ),
  Check: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  YouTube: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  LinkedIn: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
};

// --- Animated Components ---

const VoiceCallWidget = () => {
  const [status, setStatus] = useState("Connecting...");
  const [timer, setTimer] = useState(0);
  const messages = [
    "Connecting...", "Ringing...", "Connected", "Qualifying lead...",
    "Asking about budget...", "Scheduling appointment...", "Appointment booked!"
  ];

  useEffect(() => {
    let msgIndex = 0;
    const interval = setInterval(() => {
      msgIndex = (msgIndex + 1) % messages.length;
      setStatus(messages[msgIndex]);
      if (msgIndex === 0) setTimer(0);
    }, 2500);

    const timerInterval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timerInterval);
    };
  }, []);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full max-w-[340px] shadow-2xl mx-auto text-brand-text-heading border border-brand-border">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full live-dot"></div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">AI Outbound Engine</span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 20h.01M7 20h.01M12 20h.01M17 20h.01M22 20h.01M2 16h.01M7 16h.01M12 16h.01M17 16h.01M2 12h.01M7 12h.01M12 12h.01M2 8h.01M7 8h.01M2 4h.01"/>
        </svg>
      </div>

      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 overflow-hidden shadow-md border-2 border-brand-primary bg-white">
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop" alt="AI Agent" className="w-full h-full object-cover" />
        </div>
        <h4 className="font-bold">AI Sales Agent</h4>
        <p className="text-brand-primary text-xs animate-pulse">{status}</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-8 flex items-center gap-4">
        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop" alt="Sarah M." className="w-10 h-10 rounded-full object-cover" />
        <div className="text-left">
          <h5 className="text-sm font-bold">Sarah M.</h5>
          <p className="text-[10px] text-gray-500">(512) 847-XXXX</p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-1 h-12 mb-6">
        {[1, 2, 3, 4, 5].map(i => <div key={i} className="wave-bar"></div>)}
      </div>

      <div className="text-center text-2xl font-mono mb-4">{formatTime(timer)}</div>
      <div className="text-[10px] text-center text-gray-500 uppercase tracking-widest">{status}</div>
    </div>
  );
};

const SMSWidget = () => {
  const [messages, setMessages] = useState<{ text: string, type: 'in' | 'out' | 'sys' }[]>([]);
  const sequence = [
    { text: "Hi, I saw your ad about home solar panels", type: 'in', delay: 0 },
    { text: "Hi Sarah! Thanks for reaching out 👋 Are you looking to install solar for your home or a commercial property?", type: 'out', delay: 1200 },
    { text: "For my home in Austin", type: 'in', delay: 1000 },
    { text: "Great! What's your approximate monthly electricity bill?", type: 'out', delay: 900 },
    { text: "Around $280-300 per month", type: 'in', delay: 800 },
    { text: "Perfect, you'd qualify for our zero-down program 🔥 Can I schedule a quick 15-min call with a specialist?", type: 'out', delay: 1000 },
    { text: "Sure, tomorrow at 2pm works", type: 'in', delay: 700 },
    { text: "Done! ✅ Confirmed for tomorrow at 2:00 PM CST. You'll get a reminder 1 hour before. See you then!", type: 'out', delay: 1000 },
    { text: "📅 Appointment booked automatically", type: 'sys', delay: 800 }
  ];

  useEffect(() => {
    let index = 0;
    const runSequence = async () => {
      setMessages([]);
      for (const msg of sequence) {
        await new Promise(r => setTimeout(r, msg.delay));
        setMessages(prev => [...prev, msg]);
        await new Promise(r => setTimeout(r, 1000));
      }
      await new Promise(r => setTimeout(r, 3000));
      runSequence();
    };
    runSequence();
  }, []);

  return (
    <div className="bg-white rounded-[2.5rem] p-4 w-full max-w-[340px] h-[500px] shadow-xl mx-auto border-[8px] border-brand-text-heading overflow-hidden flex flex-col">
      <div className="text-center py-2 border-b border-gray-200 mb-4">
        <div className="text-[10px] font-bold">AI Outbound Engine</div>
        <div className="flex items-center justify-center gap-1">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
          <span className="text-[8px] text-gray-500">Online</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 px-2">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.type === 'out' ? 'justify-end' : m.type === 'in' ? 'justify-start' : 'justify-center'}`}>
            <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs ${
              m.type === 'out' ? 'bg-brand-primary text-white rounded-tr-none' : 
              m.type === 'in' ? 'bg-white text-brand-text-heading border border-gray-200 rounded-tl-none' : 
              'text-[10px] text-gray-400 italic'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CRMNotificationStack = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const data = [
    { icon: <Icons.Phone />, title: "AI called Marcus T. · (737) 291-XXXX", sub: "Call duration: 3m 42s · Outcome: Appointment booked", badge: "BOOKED", color: "bg-green-500/10 text-green-400" },
    { icon: <Icons.Chart />, title: "Lead scored: Sarah M. · Quality: 9/10", sub: "Sentiment: Positive · Budget confirmed · High intent", badge: "HOT LEAD", color: "bg-orange-500/10 text-orange-400" },
    { icon: <Icons.Calendar />, title: "Appointment confirmed · James R.", sub: "Tomorrow 3:00 PM CST · SMS confirmation sent", badge: "SCHEDULED", color: "bg-blue-500/10 text-blue-400" },
    { icon: <Icons.Chat />, title: "SMS replied · Priya K.", sub: "Lead asked to reschedule · AI rebooked for Friday 11am", badge: "REBOOKED", color: "bg-purple-500/10 text-purple-400" },
    { icon: <Icons.Funnel />, title: "Pipeline updated · David W.", sub: "New Lead → Qualified → Meeting Booked", badge: "PIPELINE", color: "bg-gray-500/10 text-gray-400" },
    { icon: <Icons.Bell />, title: "Follow-up sent · 47 leads · Day 3 sequence", sub: "Voice call attempted · SMS sent · Email queued", badge: "FOLLOW-UP", color: "bg-teal-500/10 text-teal-400" }
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      const next = { ...data[index], id: Date.now(), time: 0 };
      setNotifications(prev => [next, ...prev].slice(0, 5));
      index = (index + 1) % data.length;
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-[780px] mx-auto bg-white rounded-2xl border border-brand-border shadow-lg overflow-hidden">
      <div className="p-4 border-b border-brand-border flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full live-dot"></div>
          <span className="font-bold text-sm text-brand-text-heading">Live CRM Activity</span>
        </div>
        <span className="bg-green-500/10 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded">LIVE</span>
      </div>
      <div className="p-2 space-y-2">
        {notifications.map(n => (
          <div key={n.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
            <div className="w-10 h-10 flex items-center justify-center bg-brand-accent rounded-lg shrink-0">
              {React.cloneElement(n.icon, { width: 20, height: 20 })}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="flex justify-between items-start">
                <h5 className="text-sm font-bold truncate text-brand-text-heading">{n.title}</h5>
                <span className="text-[10px] text-gray-400 shrink-0 ml-2">just now</span>
              </div>
              <p className="text-xs text-gray-500 truncate">{n.sub}</p>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${n.color.replace('text-green-400', 'text-green-600').replace('text-orange-400', 'text-orange-600').replace('text-blue-400', 'text-blue-600').replace('text-purple-400', 'text-purple-600').replace('text-gray-400', 'text-gray-600').replace('text-teal-400', 'text-teal-600')}`}>{n.badge}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Toast = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ name: "Lisa K.", time: "10:30 AM" });
  const names = ["Lisa K.", "Carlos M.", "David W.", "Priya K.", "Sarah T."];
  const times = ["10:30 AM", "2:00 PM", "11:15 AM", "3:45 PM", "9:00 AM"];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setData({ name: names[index], time: times[index] });
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
      index = (index + 1) % names.length;
    }, 18000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] w-[calc(100vw-32px)] md:w-[320px] bg-white border-l-4 border-brand-primary shadow-2xl rounded-lg p-4 toast overflow-hidden border border-brand-border">
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center shrink-0 text-green-600">
          <Icons.Check />
        </div>
        <div>
          <h6 className="font-bold text-sm text-brand-text-heading">Appointment Booked</h6>
          <p className="text-xs text-gray-500">{data.name} · Solar consultation</p>
          <p className="text-sm font-bold text-brand-primary mt-1">{data.time} CST</p>
          <p className="text-[10px] text-gray-400 mt-1">via AI Voice Agent · 0 human involvement</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-1 bg-brand-primary toast-progress"></div>
    </div>
  );
};

const industryStats = {
  "Real Estate": { baseConv: 1.5, aiConv: 4.5, defaultLeads: 200, defaultDeal: 8000 },
  "Marketing Agencies": { baseConv: 3.0, aiConv: 8.0, defaultLeads: 150, defaultDeal: 3000 },
  "Insurance": { baseConv: 4.0, aiConv: 10.0, defaultLeads: 500, defaultDeal: 1200 },
  "Solar/Home Services": { baseConv: 2.0, aiConv: 6.5, defaultLeads: 300, defaultDeal: 5000 },
  "SaaS/Tech": { baseConv: 5.0, aiConv: 12.0, defaultLeads: 400, defaultDeal: 2000 },
  "High-Ticket": { baseConv: 3.0, aiConv: 9.0, defaultLeads: 100, defaultDeal: 6000 },
};

const ROICalculator = () => {
  const [industry, setIndustry] = useState("Real Estate");
  const [leads, setLeads] = useState(industryStats["Real Estate"].defaultLeads);
  const [dealValue, setDealValue] = useState(industryStats["Real Estate"].defaultDeal);

  useEffect(() => {
    setLeads(industryStats[industry as keyof typeof industryStats].defaultLeads);
    setDealValue(industryStats[industry as keyof typeof industryStats].defaultDeal);
  }, [industry]);

  const stats = industryStats[industry as keyof typeof industryStats];
  const currentCustomers = Math.round(leads * (stats.baseConv / 100));
  const aiCustomers = Math.round(leads * (stats.aiConv / 100));
  
  const currentRev = currentCustomers * dealValue;
  const aiRev = aiCustomers * dealValue;
  const extraRev = aiRev - currentRev;
  const yearlyImpact = extraRev * 12;

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-white border-y border-brand-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em] mb-4 block">ROI CALCULATOR</span>
          <h2 className="text-3xl md:text-5xl">See the Revenue You're Leaving Behind</h2>
          <p className="text-brand-text-body mt-4 max-w-2xl mx-auto">Speed-to-lead under 5 minutes increases conversions by 391%. Calculate the exact impact of an AI agent on your bottom line based on recent industry statistics.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start reveal">
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <label className="block text-sm font-bold text-brand-text-heading mb-4">Select Your Industry</label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(industryStats).map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setIndustry(ind)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${industry === ind ? 'bg-brand-primary text-white border-brand-primary' : 'bg-brand-offwhite text-brand-text-body border-brand-border hover:border-brand-primary/30'}`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-brand-offwhite p-6 rounded-2xl border border-brand-border">
              <div className="mb-8">
                <div className="flex justify-between items-end mb-4">
                  <label className="text-sm font-bold text-brand-text-heading">Monthly Lead Volume</label>
                  <span className="text-2xl font-black text-brand-primary">{leads}</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="5000" 
                  step="10" 
                  value={leads} 
                  onChange={(e) => setLeads(Number(e.target.value))}
                />
              </div>

              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-sm font-bold text-brand-text-heading">Average Deal Value (LTV)</label>
                  <span className="text-2xl font-black text-brand-primary">{formatCurrency(dealValue)}</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="20000" 
                  step="100" 
                  value={dealValue} 
                  onChange={(e) => setDealValue(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="lg:col-span-7 bg-brand-text-heading rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12 relative z-10">
              <div>
                <p className="text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Current Monthly Revenue</p>
                <div className="text-3xl font-bold text-white/80">{formatCurrency(currentRev)}</div>
                <p className="text-xs text-gray-500 mt-2">Based on {stats.baseConv}% manual conv. rate</p>
              </div>
              <div>
                <p className="text-brand-primary text-sm font-bold mb-2 uppercase tracking-wider">Projected With AI</p>
                <div className="text-4xl font-black text-white">{formatCurrency(aiRev)}</div>
                <p className="text-xs text-brand-primary/60 mt-2">Based on {stats.aiConv}% AI conv. rate</p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 relative z-10">
              <p className="text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Additional Monthly Revenue</p>
              <div className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                +{formatCurrency(extraRev)}
              </div>
              
              <div className="mt-8 flex items-center justify-between bg-white/5 rounded-xl p-4 border border-white/10">
                <span className="text-sm font-medium text-gray-300">Yearly Revenue Impact</span>
                <span className="text-xl font-bold text-white">{formatCurrency(yearlyImpact)}</span>
              </div>

              <div className="mt-6 flex items-start gap-3 bg-brand-primary/10 border border-brand-primary/20 rounded-xl p-4">
                <div className="text-brand-primary shrink-0 mt-0.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p className="text-sm text-brand-primary font-medium leading-tight">
                  <strong className="font-bold">Our Guarantee:</strong> If you don't get a positive ROI in 3 months, we work for free until you do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const YouTubeTicker = () => {
  // Actual videos from @mofiAI123-f channel
  const videoIds = [
    "tKzDWy3OEUo", "9O1twqhomvA", "rxCGsXSFshY", 
    "breu3XLF0DA", "3juOrdzxbEg", "0ZspOjmBTjg",
    "idEiVyRexOI", "wVFpIRM6s7M", "NgTYWPOGF60",
    "HEOX9MLHuAM", "ycMIAJCN7Rg", "WOp0MRYkukQ"
  ];
  
  // Split into two rows
  const row1 = videoIds.slice(0, 6);
  const row2 = videoIds.slice(6, 12);

  // Double the arrays to create seamless loop
  const tickerContent1 = [...row1, ...row1];
  const tickerContent2 = [...row2, ...row2];

  return (
    <section className="py-24 bg-brand-dark overflow-hidden ticker-hover border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 text-center reveal">
        <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em] mb-4 block">LEARN MORE</span>
        <h2 className="text-3xl md:text-5xl text-white font-extrabold leading-tight">Watch Our Latest Strategies</h2>
      </div>
      
      <div className="flex flex-col gap-6">
        {/* Row 1 */}
        <div className="flex w-[200%] animate-marquee gap-6">
          {tickerContent1.map((id, i) => (
            <a key={i} href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer" className="relative w-[300px] md:w-[400px] shrink-0 rounded-xl overflow-hidden group border border-white/10">
              <img src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt="Video thumbnail" className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`; }} />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        {/* Row 2 */}
        <div className="flex w-[200%] animate-marquee-reverse gap-6 -ml-[150px]">
          {tickerContent2.map((id, i) => (
            <a key={i} href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer" className="relative w-[300px] md:w-[400px] shrink-0 rounded-xl overflow-hidden group border border-white/10">
              <img src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt="Video thumbnail" className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`; }} />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Opening Animation for Nav
      gsap.fromTo("nav", 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // Hero Animations
      gsap.fromTo(".hero-badge", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(".hero-h1 > span", 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.1, ease: "power3.out" }
      );
      gsap.fromTo(".hero-sub", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power3.out" }
      );
      gsap.fromTo(".hero-btns", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: "power3.out" }
      );
      gsap.fromTo(".hero-video", 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, delay: 0.4, ease: "power2.out" }
      );

      // Scroll Reveals
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(el => {
        gsap.fromTo(el, 
          { y: 40, opacity: 0 },
          {
            y: 0, 
            opacity: 1, 
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { 
              trigger: el, 
              start: "top 95%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // Feature Cards Stagger
      gsap.fromTo(".feature-card", 
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1,
          scrollTrigger: { 
            trigger: ".features-grid", 
            start: "top 95%",
            toggleActions: "play none none none"
          } 
        }
      );

      // Stats Count Up
      const stats = [
        { id: "stat-1", end: 1500 },
        { id: "stat-2", end: 150 },
        { id: "stat-3", end: 40 }
      ];
      stats.forEach(s => {
        const el = document.getElementById(s.id);
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            onEnter: () => {
              gsap.to({ val: 0 }, {
                val: s.end, duration: 2, ease: "power2.out",
                onUpdate: function() { el.innerText = Math.floor(this.targets()[0].val).toLocaleString() + (s.id === 'stat-1' ? '+' : ''); }
              });
            }
          });
        }
      });

      // Logo Cards
      gsap.fromTo(".logo-card", 
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, opacity: 1, duration: 0.6, stagger: 0.12,
          scrollTrigger: { 
            trigger: ".logos-grid", 
            start: "top 95%",
            toggleActions: "play none none none"
          } 
        }
      );
    });

    return () => ctx.revert(); // Cleanup for React 18 StrictMode
  }, []);

  return (
    <div className="relative">
      <Toast />
      
      {/* --- Navbar --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-border py-4 px-4 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Closr AI Logo" className="h-10 w-auto object-contain" />
          <span className="text-xl font-extrabold tracking-tighter text-brand-text-heading">Closr AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['How It Works', 'Features', 'Results', 'Contact'].map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="nav-link text-sm font-semibold text-brand-text-body hover:text-brand-primary transition-colors">
              {link}
            </a>
          ))}
        </div>
        <a href="https://cal.com/shaik-fhiroj-4ybwq6/30min" target="_blank" rel="noopener noreferrer" className="cta-btn bg-brand-primary text-white px-4 py-2 md:px-6 md:py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-brand-primary/20 inline-block text-center whitespace-nowrap hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-primary/30 transition-all duration-300">
          Book a Demo
        </a>
      </nav>

      {/* --- Hero --- */}
      <section className="relative px-6 md:px-12 py-16 md:py-32 grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-primary/5 blur-[120px] rounded-full -z-10"></div>
        
        <div>
          <div className="hero-badge inline-flex items-center gap-2 bg-brand-accent px-3 py-1.5 rounded-full mb-6 border border-brand-primary/20">
            <div className="w-1.5 h-1.5 bg-brand-primary rounded-full shrink-0"></div>
            <span className="text-[10px] sm:text-xs font-bold text-brand-primary uppercase tracking-widest text-left">USED BY BUSINESSES SPENDING $10K+/MO ON ADS</span>
          </div>
          <h1 className="hero-h1 text-4xl sm:text-5xl md:text-7xl mb-6 md:mb-8 leading-[1.15] md:leading-[1.05] font-extrabold tracking-tighter max-w-4xl text-balance">
            You're Paying for Leads. <br className="hidden md:block" />
            Are You Calling Them <span className="text-brand-primary">Fast Enough?</span>
          </h1>
          <p className="hero-sub text-lg md:text-xl text-brand-text-body mb-10 md:mb-12 max-w-xl leading-relaxed font-medium text-balance">
            AI Outbound Engine calls every lead in under 10 seconds, qualifies them, and books appointments automatically — 24/7. No SDR team. No missed leads. Just revenue.
          </p>
          <div className="hero-btns flex flex-col sm:flex-row gap-4 mb-10 md:mb-12">
            <a href="https://cal.com/shaik-fhiroj-4ybwq6/30min" target="_blank" rel="noopener noreferrer" className="cta-btn bg-brand-primary text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl shadow-brand-primary/30 text-center hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-primary/40 transition-all duration-300">
              Book a Free Demo
            </a>
            <a href="#how-it-works" className="cta-btn border-2 border-brand-primary text-brand-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-brand-accent hover:border-[3px] hover:text-brand-primary-dark hover:-translate-y-1 transition-all duration-300 text-center">
              See How It Works
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">
            <span>&lt; 10 Second Response</span>
            <span className="hidden sm:inline">·</span>
            <span>Zero Manual Calls</span>
            <span className="hidden sm:inline">·</span>
            <span>Deployed in 2 Weeks</span>
          </div>
        </div>
        <div className="hero-video relative">
          <div className="bg-brand-offwhite p-2 rounded-2xl shadow-2xl border border-brand-border">
            <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="AI Outbound Engine Demo" frameBorder="0" allowFullScreen className="w-full aspect-video rounded-xl grayscale-[0.2] hover:grayscale-0 transition-all"></iframe>
          </div>
          <p className="text-center text-[10px] text-gray-500 mt-4 uppercase tracking-widest">↑ Watch a real AI call booking an appointment</p>
        </div>
      </section>

      {/* --- Problem --- */}
      <section className="bg-brand-offwhite py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center mb-16 reveal">
          <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em] mb-4 block">THE PROBLEM</span>
          <h2 className="text-3xl md:text-5xl max-w-3xl mx-auto">Most Businesses Invest Thousands in Ads. Then Leave the Leads to Die.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {[
            { t: "Leads Go Cold in Minutes", d: "Studies show 78% of deals go to the first company that responds. Most businesses call back in 2+ hours — if at all." },
            { t: "Manual Follow-Up Always Fails", d: "Your team can't call 200 leads a day, send follow-up texts, and still close deals. Something always gets dropped." },
            { t: "Ad Spend Wasted", d: "You're paying $20–$100 per lead. If they don't get called instantly, you're burning budget on leads that convert for your competitors." }
          ].map((card, i) => (
            <div key={i} className="bg-white p-10 rounded-2xl border border-brand-border shadow-sm hover:shadow-md transition-shadow reveal">
              <h4 className="text-xl mb-4 font-bold text-brand-text-heading">{card.t}</h4>
              <p className="text-sm leading-relaxed text-brand-text-body">{card.d}</p>
            </div>
          ))}
        </div>
        <p className="text-center font-bold text-brand-text-heading reveal">The average business loses 60–80% of their leads before the first contact. AI Outbound Engine fixes that.</p>
      </section>

      {/* --- How It Works --- */}
      <section id="how-it-works" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20 reveal">
          <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em] mb-4 block">THE SYSTEM</span>
          <h2 className="text-3xl md:text-5xl mb-4 font-extrabold text-brand-text-heading">From Lead to Booked Meeting — In Under 60 Seconds</h2>
          <p className="text-brand-text-body text-lg">Everything happens automatically the moment a lead fills your form.</p>
        </div>
        <div className="max-w-4xl mx-auto relative">
          {/* Connecting Line for all devices */}
          <div className="absolute left-6 md:left-[23px] top-12 bottom-12 w-1 bg-brand-primary/20 rounded-full"></div>
          
          <div className="space-y-12 md:space-y-16">
            {[
              { s: "Step 1", t: "Lead Submits a Form", d: "Whether it's a Facebook ad, Google ad, or website form — the moment they click submit, our system receives it instantly." },
              { s: "Step 2", t: "AI Voice Agent Calls in < 10 Seconds", d: "Before the lead even leaves the thank-you page, they're already getting a call. Natural voice, real conversation — not a robot." },
              { s: "Step 3", t: "Qualifies the Lead on the Call", d: "The AI asks your custom qualifying questions — budget, timeline, intent. It handles objections, books callbacks, and adapts to every conversation." },
              { s: "Step 4", t: "Books, Reschedules, or Cancels", d: "Live on the call, the AI books the appointment directly to your calendar. Reschedule requests, cancellations — all handled automatically." },
              { s: "Step 5", t: "CRM Updated. Pipeline Moved.", d: "The moment the call ends: CRM notes written, pipeline stage updated, 7-day follow-up sequence triggered — all with zero human involvement." }
            ].map((step, i) => (
              <div key={i} className="flex flex-row gap-6 md:gap-10 items-start reveal relative z-10 group hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0 shadow-[0_0_20px_rgba(242,125,38,0.4)] ring-4 ring-white group-hover:scale-110 transition-transform duration-300">{i+1}</div>
                <div className="flex-1 pt-1 md:pt-2">
                  <h4 className="text-xl md:text-2xl mb-3 font-bold text-brand-text-heading">{step.t}</h4>
                  <p className="text-brand-text-body leading-relaxed md:text-lg max-w-2xl">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WATCH IT WORK --- */}
      <section className="bg-brand-offwhite py-24 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-20 reveal">
          <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em] mb-4 block">LIVE SYSTEM PREVIEW</span>
          <h2 className="text-3xl md:text-5xl mb-4">Watch the AI Work in Real Time</h2>
          <p className="text-brand-text-body">This is exactly what happens the moment a lead fills your form.</p>
        </div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="reveal"><VoiceCallWidget /></div>
          <div className="reveal"><SMSWidget /></div>
        </div>
        <div className="reveal"><CRMNotificationStack /></div>
      </section>

      {/* --- Features --- */}
      <section id="features" className="bg-brand-accent py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center mb-20 reveal">
          <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em] mb-4 block">FEATURES</span>
          <h2 className="text-3xl md:text-5xl text-brand-text-heading font-extrabold leading-tight">9 AI Systems Running Your Entire Outbound Operation</h2>
        </div>
        <div className="features-grid grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { i: <Icons.Phone />, t: "AI Voice Agent", d: "Calls every lead in under 10 seconds. Natural conversation, custom script, handles objections and books live on the call." },
            { i: <Icons.Chat />, t: "SMS AI Text Agent", d: "Activates on any inbound text. Qualifies leads, books appointments, and syncs with the voice agent seamlessly." },
            { i: <Icons.Sync />, t: "Two-Way Voice ↔ SMS Sync", d: "Lead on a call says 'text me' → SMS fires instantly. Lead texts 'call me now' → voice agent calls immediately." },
            { i: <Icons.Database />, t: "Auto CRM Notes", d: "Full call summary, lead score, objections, and outcome written into your CRM automatically after every call." },
            { i: <Icons.Funnel />, t: "Pipeline Movement", d: "Lead stages update automatically — New Lead → Qualified → Meeting Booked — based on each interaction outcome." },
            { i: <Icons.Calendar />, t: "7-Day Follow-Up Engine", d: "Automated voice, SMS, and email sequence for every lead that doesn't book. Day 7: breakup message — 30%+ reply rate." },
            { i: <Icons.Bell />, t: "Meeting Reminders", d: "Instant confirmation, 24hr reminder, 1hr reminder. No-show? Auto-reschedule text fires immediately." },
            { i: <Icons.Chart />, t: "Post-Call AI Analysis", d: "Lead score 1–10, sentiment detection, objections logged, and a plain-English summary — after every single call." },
            { i: <Icons.Dashboard />, t: "Client Dashboard", d: "Real-time view of all leads, calls made, appointments booked, and pipeline stages. Everything in one place." }
          ].map((f, i) => (
            <div key={i} className="feature-card bg-white p-10 rounded-2xl border border-brand-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="mb-6 group-hover:scale-110 group-hover:text-brand-primary transition-transform duration-300 origin-left">{f.i}</div>
              <h4 className="text-lg mb-3 font-bold text-brand-text-heading group-hover:text-brand-primary transition-colors">{f.t}</h4>
              <p className="text-sm text-brand-text-body leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Results --- */}
      <section id="results" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20 reveal">
          <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em] mb-4 block">REAL RESULTS</span>
          <h2 className="text-3xl md:text-5xl mb-4">What Happens When You Deploy AI Outbound Engine</h2>
          <p className="text-brand-text-body max-w-2xl mx-auto">Results from a US-based marketing agency running paid ads across real estate and home services:</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { id: "stat-1", l: "Total AI calls handled in a single month" },
            { id: "stat-2", l: "Appointments booked automatically" },
            { id: "stat-3", l: "Deals closed from those appointments" }
          ].map(s => (
            <div key={s.id} className="bg-white p-10 rounded-2xl border border-brand-border shadow-sm hover:shadow-md transition-shadow text-center reveal">
              <div id={s.id} className="text-5xl font-extrabold text-brand-primary mb-4">0</div>
              <p className="text-sm text-brand-text-body font-medium">{s.l}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 font-bold mb-16 reveal">$0 extra headcount. No SDR team. Fully automated.</p>
        
        <div className="bg-white border border-brand-border rounded-2xl overflow-hidden reveal">
          <div className="grid grid-cols-2 border-b border-brand-border bg-gray-50">
            <div className="p-6 font-bold text-gray-400 line-through text-center">WITHOUT AI Outbound Engine</div>
            <div className="p-6 font-bold text-brand-primary text-center">WITH AI Outbound Engine</div>
          </div>
          {[
            ["Leads called 2+ hours later", "Every lead called in under 10 seconds"],
            ["SDR team manually dialing 8 hours/day", "AI handles every call automatically"],
            ["Most follow-ups never happen", "7-day sequence fires for every single lead"],
            ["CRM updated when someone remembers", "CRM notes written after every call"],
            ["No-shows lost forever", "No-show triggers instant auto-reschedule"],
            ["No idea which leads are quality", "Every lead scored and analyzed by AI"]
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-2 border-b border-brand-border last:border-0">
              <div className="p-4 md:p-6 text-sm text-gray-500 bg-red-500/5 border-r border-brand-border">{row[0]}</div>
              <div className="p-4 md:p-6 text-sm font-bold text-brand-text-heading bg-green-500/5">{row[1]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Logos --- */}
      <section className="bg-brand-offwhite py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center mb-16 reveal">
          <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em] mb-4 block">POWERED BY</span>
          <h2 className="text-3xl md:text-5xl text-brand-text-heading font-extrabold leading-tight">Enterprise-Grade Infrastructure. Fully Managed.</h2>
        </div>
        <div className="logos-grid grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[
            { r: "All Automation Workflows", svg: <div className="flex items-center justify-center gap-2.5"><img src="https://logo.clearbit.com/n8n.io" alt="n8n" className="h-9 w-9 rounded" onError={(e) => e.currentTarget.style.display = 'none'} /><span className="text-3xl font-black text-gray-800 tracking-tighter">n8n</span></div> },
            { r: "AI Voice Agents", svg: <div className="flex items-center justify-center gap-2.5"><img src="https://logo.clearbit.com/retellai.com" alt="Retell AI" className="h-9 w-9 rounded" onError={(e) => e.currentTarget.style.display = 'none'} /><span className="text-2xl font-bold text-gray-800 tracking-tight">Retell AI</span></div> },
            { r: "CRM & Customer Data", svg: <div className="flex items-center justify-center gap-2.5"><img src="https://logo.clearbit.com/gohighlevel.com" alt="GoHighLevel" className="h-9 w-9 rounded" onError={(e) => e.currentTarget.style.display = 'none'} /><span className="text-2xl font-bold text-gray-800 tracking-tight">HighLevel</span></div> },
            { r: "Phone Numbers & SMS", svg: <div className="flex items-center justify-center gap-2.5"><img src="https://logo.clearbit.com/twilio.com" alt="Twilio" className="h-9 w-9 rounded" onError={(e) => e.currentTarget.style.display = 'none'} /><span className="text-2xl font-medium text-gray-800 tracking-tight">twilio</span></div> }
          ].map((l, i) => (
            <div key={i} className="logo-card bg-white p-8 rounded-2xl border border-brand-border text-center shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center gap-5">
              <div className="flex justify-center items-center w-full">{l.svg}</div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{l.r}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Who It's For --- */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20 reveal">
          <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em] mb-4 block">IDEAL FOR</span>
          <h2 className="text-3xl md:text-5xl">If You're Paying for Leads, You Can't Afford Slow Follow-Up</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { i: "Real Estate", p: "Spending on ads while leads go cold in 2 hours", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400" },
            { i: "Marketing Agencies", p: "Your clients need speed-to-lead. You don't have the backend.", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400" },
            { i: "Insurance", p: "High-intent quote leads. Slow follow-up kills 70% of them.", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400" },
            { i: "Solar/Home Services", p: "Mass lead volume. Manual calling can't keep up.", img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400" },
            { i: "SaaS/Tech", p: "Demo requests pile up. Your reps are overwhelmed.", img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400" },
            { i: "High-Ticket Business", p: "You're paying for leads. Are you calling them fast enough?", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" }
          ].map((c, i) => (
            <div key={i} className="group rounded-2xl overflow-hidden border border-brand-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 reveal bg-white">
              <div className="h-48 overflow-hidden">
                <img src={c.img} alt={c.i} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 bg-white">
                <h4 className="text-lg mb-2 font-bold text-brand-text-heading group-hover:text-brand-primary transition-colors">{c.i}</h4>
                <p className="text-sm text-brand-text-body mb-4 leading-relaxed">{c.p}</p>
                <span className="text-sm font-bold text-brand-primary group-hover:translate-x-1 inline-block transition-transform">This is for you →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- ROI Calculator --- */}
      <ROICalculator />

      {/* --- FAQ --- */}
      <section className="bg-brand-offwhite py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em] mb-4 block">FAQ</span>
            <h2 className="text-3xl md:text-5xl">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              ["How fast does the AI actually call a lead?", "Under 10 seconds from the moment they submit any form or ad. Before they've even left your thank-you page."],
              ["Does it sound like a robot?", "No. The voice agent uses natural AI speech that adapts to the lead's tone, handles interruptions, and sounds like a real sales rep. Most leads don't know they're speaking to an AI unless told."],
              ["What if a lead says \"call me back later\"?", "The system understands natural language. \"Call me at 3pm\" → it calls at exactly 3pm. \"Try me in 2 hours\" → it schedules and fires automatically."],
              ["What happens if a lead doesn't pick up?", "The 7-day automated follow-up engine activates — calling, texting, and emailing across 7 days until they respond or the sequence closes."],
              ["How long does it take to set up?", "2 weeks from kickoff to live system. That includes building the voice agent, SMS agent, all automations, CRM integration, and full testing."]
            ].map((faq, i) => (
              <div key={i} className="bg-white border border-brand-border rounded-2xl reveal overflow-hidden shadow-sm">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-8 text-left flex justify-between items-center">
                  <span className="font-bold text-brand-text-heading text-lg">{faq[0]}</span>
                  <span className={`faq-icon text-brand-primary transition-transform text-xl ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                <div className={`grid transition-all duration-300 ease-in-out ${openFaq === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className="px-8 pb-8 text-sm text-brand-text-body leading-relaxed">
                      {faq[1]}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Final CTA --- */}
      <section id="contact" className="bg-brand-accent py-24 md:py-32 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto reveal">
          <h2 className="text-4xl md:text-6xl text-brand-text-heading mb-8 leading-tight">Stop Losing Leads. Start Booking Meetings — Automatically.</h2>
          <p className="text-lg md:text-xl text-brand-text-body mb-12 leading-relaxed">Book a free 30-minute demo. We'll show you the live system, a real call recording, and exactly how we'd set it up for your business.</p>
          <a href="https://cal.com/shaik-fhiroj-4ybwq6/30min" target="_blank" rel="noopener noreferrer" className="cta-btn bg-brand-primary text-white px-8 md:px-12 py-4 md:py-6 rounded-lg font-bold text-lg md:text-xl shadow-2xl shadow-brand-primary/40 mb-8 inline-block hover:-translate-y-1 hover:shadow-brand-primary/60 transition-all duration-300">
            Book a Free Demo Call
          </a>
          
          <div className="flex justify-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-sm border border-brand-border text-sm md:text-base font-bold text-brand-text-heading">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <span>If you don't get an ROI in 3 months, we work for free until you do.</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-xs font-bold text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2"><Icons.Check /> System live in 2 weeks</div>
            <div className="flex items-center gap-2"><Icons.Check /> No SDR team needed</div>
            <div className="flex items-center gap-2"><Icons.Check /> Full support included</div>
          </div>
        </div>
      </section>

      {/* --- YouTube Ticker Section --- */}
      <YouTubeTicker />

      {/* --- Footer --- */}
      <footer className="bg-brand-offwhite border-t border-brand-border py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="Closr AI Logo" className="h-12 w-auto object-contain" />
              <span className="text-2xl font-extrabold tracking-tighter text-brand-text-heading">Closr AI</span>
            </div>
            <p className="text-brand-text-body max-w-xs mb-6">Your leads. Called. Qualified. Booked.</p>
            <div className="flex items-center gap-4">
              <a href="https://www.youtube.com/@mofiAI123-f" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-colors">
                <Icons.YouTube />
              </a>
              <a href="https://www.linkedin.com/company/profitgrowth-ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Icons.LinkedIn />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h6 className="text-brand-text-heading font-bold mb-6">Product</h6>
              <ul className="space-y-4 text-sm text-brand-text-body">
                <li><a href="#how-it-works" className="hover:text-brand-primary transition-colors">How It Works</a></li>
                <li><a href="#features" className="hover:text-brand-primary transition-colors">Features</a></li>
                <li><a href="#results" className="hover:text-brand-primary transition-colors">Results</a></li>
              </ul>
            </div>
            <div>
              <h6 className="text-brand-text-heading font-bold mb-6">Contact</h6>
              <ul className="space-y-4 text-sm text-brand-text-body break-all">
                <li><a href="mailto:profitgrowthai223311@gmail.com" className="hover:text-brand-primary transition-colors">profitgrowthai223311@gmail.com</a></li>
                <li>ProfitGrowthAI.in</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-brand-border text-center text-[10px] text-gray-400 uppercase tracking-widest">
          © 2025 ProfitGrowthAI.in — All rights reserved.
        </div>
      </footer>
    </div>
  );
}
