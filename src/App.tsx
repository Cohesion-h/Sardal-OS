/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Shield, 
  ShipWheel,
  Compass, 
  Award, 
  CheckCircle, 
  FileText, 
  Layout, 
  Palette, 
  Type, 
  ChevronRight, 
  Menu, 
  X, 
  ExternalLink,
  ChevronLeft,
  Layers,
  Lock,
  Cpu,
  Monitor,
  Download,
  Share2,
  Bookmark
} from 'lucide-react';

// --- Constants & Data ---

const BRAND_PALETTE = [
  { name: 'Sovereign Void', hex: '#121316', role: 'Foundation / Background', text: 'text-white' },
  { name: 'Core Intelligence', hex: '#8abfea', role: 'Primary / Highlights', text: 'text-on-primary-container' },
  { name: 'Strategic Blue', hex: '#084e73', role: 'Deep Action / Containers', text: 'text-white' },
  { name: 'Institutional Steel', hex: '#c0c7ce', role: 'Structure / Secondary', text: 'text-on-secondary' },
  { name: 'Metallic Gray', hex: '#38393c', role: 'Surface / Elevating', text: 'text-white' },
  { name: 'Accent Gold', hex: '#b5a363', role: 'Prestige / Detail', text: 'text-white' },
];

const FLAG_COLORS = [
  { name: 'National Green', hex: '#007a3d' },
  { name: 'Sovereign White', hex: '#ffffff' },
  { name: 'Protective Red', hex: '#ce1126' },
  { name: 'Foundational Black', hex: '#000000' },
];

const STRATEGIC_PHASES = [
  {
    tag: 'Phase 01',
    title: 'Cognitive Foundations',
    titleAr: 'الأسس الإدراكية',
    desc: 'Establishing the local-first architecture and Arabic core models.',
    descAr: 'تأسيس البنية التحتية المحلية والنماذج العربية الأساسية.',
    items: ['Air-gapped clusters', 'Arabic NLP core', 'Kuwaiti Data residency']
  },
  {
    tag: 'Phase 02',
    title: 'Sovereign Scale',
    titleAr: 'التوسع السيادي',
    desc: 'Integration with critical government sectors and secure institutions.',
    descAr: 'التكامل مع القطاعات الحكومية الحرجة والمؤسسات السيادية.',
    items: ['CITRA Compliance', 'CBK CORF Integration', 'Secure Intranet']
  },
  {
    tag: 'Phase 03',
    title: 'Global Outreach',
    titleAr: 'الانتشار العالمي',
    desc: 'Empowering the OIC region with independent technological solutions.',
    descAr: 'تمكين منطقة منظمة التعاون الإسلامي بحلول تقنية مستقلة.',
    items: ['Cross-border secure OS', 'Islamic Ethics Engine', 'Post-Quantum Crypto']
  }
];

// --- Components ---

const SardalWheel = ({ className = "w-12 h-12", color = "#8abfea" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="2" strokeDasharray="4 2" className="opacity-30" />
    <motion.g
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="50" cy="50" r="12" stroke={color} strokeWidth="3" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1="50" y1="50"
          x2={50 + 38 * Math.cos((angle * Math.PI) / 180)}
          y2={50 + 38 * Math.sin((angle * Math.PI) / 180)}
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
      {/* Kuwait Flag Accents */}
      <rect x="47" y="10" width="6" height="4" fill="#007a3d" rx="1" />
      <rect x="47" y="86" width="6" height="4" fill="#ce1126" rx="1" />
      <rect x="10" y="47" width="4" height="6" fill="#000000" rx="1" />
      <rect x="86" y="47" width="4" height="6" fill="#ffffff" rx="1" />
    </motion.g>
  </svg>
);

const SectionHeading = ({ children, arabic, subtitle, subtitleAr }) => (
  <div className="mb-12">
    <div className="flex items-center gap-4 mb-4">
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold uppercase tracking-tight text-primary-container leading-none">{children}</h2>
        <h2 className="arabic text-3xl font-bold text-primary-container mt-2">{arabic}</h2>
      </div>
      <div className="h-px flex-1 bg-outline-variant/30" />
    </div>
    <div className="flex flex-col md:flex-row justify-between items-start gap-4 text-on-surface-variant">
      <p className="max-w-md text-sm">{subtitle}</p>
      <p className="arabic max-w-md text-sm">{subtitleAr}</p>
    </div>
  </div>
);

const BrandCard = ({ title, arabic, children, icon: Icon }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass p-8 relative overflow-hidden group border border-outline-variant/20 hover:border-primary/30 transition-colors"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
    <div className="flex items-start justify-between mb-6">
      <div className="p-3 bg-surface-bright/30 rounded-lg">
        <Icon className="w-6 h-6 text-primary-container" />
      </div>
      <div className="text-right">
        <span className="text-[10px] font-bold tracking-widest text-outline uppercase">OS Blueprint</span>
      </div>
    </div>
    <div className="flex justify-between items-end">
      <div>
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="arabic text-lg text-primary">{arabic}</p>
      </div>
    </div>
    <div className="mt-6 pt-6 border-t border-outline-variant/20">
      {children}
    </div>
  </motion.div>
);

export default function App() {
  const [activeLang, setActiveLang] = useState<'ar' | 'en'>('ar');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-primary/20 bg-surface text-on-surface overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-4 shadow-2xl' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SardalWheel className="w-10 h-10" />
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black tracking-tighter">SARDAL<span className="text-primary-container">OS</span></span>
              <span className="arabic text-xs font-bold opacity-70">نظام السردال السيادي</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
            <a href="#identity" className="hover:text-primary transition-colors">Identity</a>
            <a href="#palette" className="hover:text-primary transition-colors">Surface Palette</a>
            <a href="#roadmap" className="hover:text-primary transition-colors">Strategic Plan</a>
            <a href="#mission" className="hover:text-primary transition-colors">Charter</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveLang(activeLang === 'ar' ? 'en' : 'ar')}
              className="px-6 py-2 glass-bright rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-2 hover:bg-surface-bright transition-colors"
            >
              <Globe className="w-3 h-3" />
              {activeLang === 'ar' ? 'English' : 'العربية'}
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(138,191,234,0.1),transparent_70%)]" />
            <div className="absolute bottom-0 inset-x-0 h-[50vh] bg-gradient-to-t from-surface via-surface/80 to-transparent" />
            {/* Grid line background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#8abfea 1px, transparent 1px), linear-gradient(90deg, #8abfea 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
          </div>

          <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-bright text-[11px] uppercase font-black tracking-[0.3em] text-primary-container mb-12 shadow-inner border border-white/5">
                <Shield className="w-4 h-4" />
                Sovereign Cognitive Safeguard
              </div>

              <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-none">
                SARDAL<span className="text-primary-container">OS</span>
              </h1>
              
              <div className="arabic text-6xl md:text-8xl font-bold mb-16 text-primary-container drop-shadow-2xl">
                نظام تشغيل <span className="text-white">السردال</span>
              </div>

              <p className={`max-w-3xl mx-auto text-xl md:text-2xl text-on-surface-variant leading-relaxed mb-16 font-medium ${activeLang === 'ar' ? 'arabic tracking-wide' : 'tracking-tight'}`}>
                {activeLang === 'ar' 
                  ? 'الدرع الرقمي لسيادتك الإدراكية والثقافية. نظام ذكاء اصطناعي سيادي مبني لإحقاق الاستقلال التقني الكويتي والعربي.'
                  : 'Your shield for cognitive and cultural sovereignty. A sovereign AI operating system built to achieve Kuwaiti and Arabic technical independence.'
                }
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <button className="w-full sm:w-auto px-10 py-5 bg-primary-container text-on-primary-container font-black uppercase tracking-[0.2em] text-xs rounded-xl shadow-[0_0_40px_-10px_rgba(138,191,234,0.5)] hover:bg-primary transition-all hover:scale-105 active:scale-95">
                  {activeLang === 'ar' ? 'ميثاق السيادة' : 'Sovereignty Charter'}
                </button>
                <button className="w-full sm:w-auto px-10 py-5 glass-bright font-black uppercase tracking-[0.2em] text-xs rounded-xl hover:bg-surface-bright transition-all border border-white/10">
                  {activeLang === 'ar' ? 'البنية التحتية' : 'Infrastructure Brief'}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Decorative Wheel Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.07] pointer-events-none">
            <SardalWheel className="w-[1000px] h-[1000px]" />
          </div>
          
          {/* Bottom stats rail */}
          <div className="absolute bottom-12 inset-x-0 overflow-hidden hidden md:block">
             <div className="flex items-center gap-24 whitespace-nowrap opacity-30 animate-pulse px-12">
                {[
                  "LOCAL_FIRST_INITIATIVE", "AIR_GAPPED_READY", "ARABIC_LLM_V2.6", "CITRA_TIER_IV", "CBK_CORF_COMPLIANT"
                ].map(stat => (
                  <div key={stat} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-[11px] font-black tracking-[0.4em] uppercase">{stat}</span>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* Identity & Symbols */}
        <section id="identity" className="py-32 max-w-7xl mx-auto px-6">
          <SectionHeading 
            arabic="الهوية الأساسية والرموز" 
            subtitle="The symbolic foundations of maritime guidance and technical leadership."
            subtitleAr="الأسس الرمزية للتوجيه البحري والقيادة التقنية."
          >
            Core Visual Identity
          </SectionHeading>

          <div className="grid md:grid-cols-3 gap-10">
            <BrandCard title="The Master Symbol" arabic="رمز السردال" icon={ShipWheel}>
              <div className="flex flex-col items-center gap-10">
                <div className="p-16 brushed-metal rounded-3xl glow-primary border border-primary/20 relative group-hover:rotate-12 transition-transform duration-[2s]">
                  <SardalWheel className="w-32 h-32" />
                </div>
                <p className="text-xs text-on-surface-variant text-center leading-relaxed font-medium">
                  The ship's wheel (Daffa) represents strategic direction, institutional leadership, and digital sovereignty.
                </p>
              </div>
            </BrandCard>

            <BrandCard title="Arabic Calligraphy" arabic="الخط العربي السيادي" icon={Type}>
              <div className="flex flex-col items-center gap-10">
                <div className="h-32 flex items-center justify-center p-8 glass-bright rounded-2xl w-full">
                  <span className="arabic text-7xl font-bold text-white selection:bg-primary/50">السردال</span>
                </div>
                <div className="space-y-6 w-full">
                  <div className="flex justify-between items-center text-[11px] uppercase font-black tracking-widest text-outline">
                    <span>Noto Naskh Arabic</span>
                    <span className="arabic">نوتو نسخ المعدل</span>
                  </div>
                  <div className="h-1.5 bg-surface-bright rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      className="h-full bg-primary-container" 
                    />
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
                    A custom-tuned Naskh script balanced with Hanken Grotesk for dual-language parity in government briefings.
                  </p>
                </div>
              </div>
            </BrandCard>

            <BrandCard title="National Integration" arabic="التكامل الوطني" icon={Award}>
              <div className="flex flex-col items-center gap-10">
                <div className="grid grid-cols-2 gap-4 w-full">
                  {FLAG_COLORS.map(c => (
                    <div key={c.hex} className="flex flex-col gap-3 p-4 glass rounded-xl border border-white/5 hover:bg-surface-bright transition-colors">
                      <div className="w-full h-8 rounded-md shadow-inner" style={{ backgroundColor: c.hex }} />
                      <span className="text-[10px] font-black text-outline uppercase tracking-widest">{c.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
                  Discrete integration of the Kuwaiti flag colors into digital UI elements as indicators of security tiering.
                </p>
              </div>
            </BrandCard>
          </div>
        </section>

        {/* Surface Palette */}
        <section id="palette" className="py-32 bg-surface-container/30 border-y border-outline-variant/10">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading 
              arabic="لوحة الألوان الرقمية" 
              subtitle="High-contrast dark palettes optimized for 24/7 command center visibility."
              subtitleAr="لوحات ألوان داكنة عالية التباين لغرف العمليات التي تعمل على مدار الساعة."
            >
              Surface Palette
            </SectionHeading>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {BRAND_PALETTE.map((p) => (
                <div key={p.hex} className="glass rounded-2xl overflow-hidden group hover:border-primary/40 transition-all cursor-crosshair">
                  <div 
                    className="h-56 transition-transform group-hover:scale-105 duration-700 relative overflow-hidden" 
                    style={{ backgroundColor: p.hex }} 
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col gap-1 mb-4">
                      <span className="text-[11px] font-black uppercase tracking-[0.2em]">{p.name}</span>
                      <span className="text-[10px] font-mono opacity-50 uppercase">{p.hex}</span>
                    </div>
                    <p className="text-[11px] text-outline leading-tight font-medium uppercase tracking-tighter">{p.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategic Plan */}
        <section id="roadmap" className="py-32 max-w-7xl mx-auto px-6">
          <SectionHeading 
            arabic="خطة التنفيذ الاستراتيجي" 
            subtitle="The roadmap toward full cloud-to-local sovereignty transition."
            subtitleAr="خارطة الطريق نحو الانتقال الكامل لسيادة البيانات المحلية."
          >
            Strategic Roadmap
          </SectionHeading>

          <div className="grid lg:grid-cols-3 gap-12 relative">
            {STRATEGIC_PHASES.map((phase, i) => (
              <motion.div 
                key={phase.tag}
                initial={{ opacity: 0, x: i === 0 ? -20 : i === 2 ? 20 : 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="relative z-10 glass p-10 rounded-3xl border border-white/5 hover:border-primary/20 transition-all group overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-[80px] group-hover:bg-primary/10 transition-colors" />
                
                <div className="w-16 h-16 rounded-2xl brushed-metal flex items-center justify-center mb-8 text-primary shadow-2xl group-hover:glow-primary transition-all">
                  {i === 0 ? <Cpu className="w-8 h-8" /> : i === 1 ? <Layers className="w-8 h-8" /> : <Globe className="w-8 h-8" />}
                </div>

                <span className="text-[11px] font-black tracking-[0.4em] text-primary-container uppercase mb-6 block">{phase.tag}</span>
                
                <h3 className="text-2xl font-black mb-1">{phase.title}</h3>
                <p className="arabic text-xl text-primary font-bold mb-6">{phase.titleAr}</p>
                
                <p className="text-sm text-on-surface-variant mb-10 leading-relaxed font-medium min-h-[4rem]">
                  {activeLang === 'ar' ? phase.descAr : phase.desc}
                </p>

                <div className="space-y-4">
                  {phase.items.map(item => (
                    <div key={item} className="flex items-center gap-4 text-xs font-bold text-outline">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Corporate Presentation Mockups */}
        <section className="py-32 bg-surface-container/50 border-y border-outline-variant/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="order-2 lg:order-1 relative">
                {/* Mockup Frame */}
                <div className="aspect-[16/10] glass rounded-3xl overflow-hidden p-3 shadow-2xl border border-white/10 group">
                   <div className="relative h-full bg-surface-dim rounded-2xl overflow-hidden shadow-inner flex flex-col">
                      <div className="h-10 bg-surface-bright/50 border-b border-white/5 flex items-center px-4 justify-between">
                         <div className="flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-error/40" />
                            <div className="w-2 h-2 rounded-full bg-secondary/40" />
                            <div className="w-2 h-2 rounded-full bg-primary/40" />
                         </div>
                         <div className="flex items-center gap-3">
                            <SardalWheel className="w-4 h-4" />
                            <span className="text-[9px] font-black tracking-widest text-outline uppercase">Sardal Core Shell</span>
                         </div>
                         <div className="w-12 h-1 bg-outline-variant/30 rounded-full" />
                      </div>
                      
                      <div className="flex-1 p-8 grid grid-cols-12 gap-6">
                        <div className="col-span-4 space-y-6">
                           <div className="glass p-4 rounded-xl border border-primary/20 bg-primary/5">
                              <p className="text-[9px] font-black uppercase text-primary mb-2">Sector Status</p>
                              <p className="arabic text-xl font-bold leading-none">سيادي نشط</p>
                           </div>
                           <div className="space-y-3">
                              {[1,2,3,4].map(i => (
                                <div key={i} className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                   <div className="h-full bg-primary-container/40" style={{ width: `${30 + (i*15)}%` }} />
                                </div>
                              ))}
                           </div>
                        </div>
                        <div className="col-span-8 glass p-6 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col justify-center items-center">
                           <div className="absolute top-0 right-0 p-4">
                             <Lock className="w-3 h-3 text-outline opacity-30" />
                           </div>
                           <SardalWheel className="w-24 h-24 mb-6 opacity-20" />
                           <p className="arabic text-4xl font-bold tracking-widest text-white/50 mb-4">السردال</p>
                           <p className="text-[10px] font-black tracking-[0.4em] text-primary animate-pulse">AUTHENTICATING_IDENTITY</p>
                        </div>
                      </div>
                   </div>
                </div>
                {/* Floating Mobile Card */}
                <div className="absolute -bottom-10 -right-10 w-64 aspect-[9/16] glass rounded-3xl p-3 shadow-2xl hidden xl:block border border-white/10">
                   <div className="h-full bg-surface-dim rounded-[1.5rem] p-6 flex flex-col justify-between items-center relative overflow-hidden">
                      <div className="w-12 h-1 bg-surface-bright rounded-full mb-8" />
                      <SardalWheel className="w-20 h-20" />
                      <div className="w-full space-y-4 text-center">
                         <div className="h-2 bg-primary/20 rounded-full w-24 mx-auto" />
                         <span className="arabic text-2xl font-bold text-white block">ابدأ الجلسة</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
                   </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <SectionHeading 
                  arabic="تطبيقات البيئة السيادية" 
                  subtitle="Enterprise shells designed for administrative efficiency and high-security data visualization."
                  subtitleAr="أصداف مؤسسية مصممة للكفاءة الإدارية وتصور البيانات عالية الأمان."
                >
                  OS Interface Shells
                </SectionHeading>

                <div className="space-y-6">
                  {[
                    { title: 'Governance Command Center', ar: 'مركز القيادة والتحكم', icon: Monitor, tag: 'Tier 4' },
                    { title: 'Secure Comms Intranet', icon: Share2, ar: 'شبكة تواصل سيادية', tag: 'PQC_READY' },
                    { title: 'Sardal Analytical AI', icon: Cpu, ar: 'تحليلات السردال', tag: 'LOCAL_DATA' }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-6 p-6 glass rounded-2xl hover:border-primary/20 cursor-pointer group"
                    >
                      <div className="p-4 brushed-metal rounded-xl text-primary-container shadow-xl">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-black text-sm uppercase tracking-widest">{item.title}</h4>
                          <span className="text-[9px] font-black px-2 py-0.5 bg-primary/10 text-primary rounded">{item.tag}</span>
                        </div>
                        <p className="arabic text-sm text-outline font-bold leading-none">{item.ar}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Charter */}
        <section id="mission" className="py-40 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute -inset-24 bg-primary/5 rounded-full blur-[120px] -z-10" />
            <SectionHeading 
              arabic="الميثاق والسيادة" 
              subtitle="Returning the rudder of technological progress to our national hands."
              subtitleAr="إعادة دفة التقدم التقني إلى أيدينا الوطنية."
            >
              The Sovereign Charter
            </SectionHeading>
            
            <div className="glass p-16 md:p-24 rounded-[3rem] border border-white/5 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <SardalWheel className="w-48 h-48" />
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLang}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-12"
                >
                  <p className={`text-4xl md:text-6xl font-black leading-[1.1] text-on-surface mb-12 drop-shadow-sm ${activeLang === 'ar' ? 'arabic' : 'tracking-tighter'}`}>
                    {activeLang === 'ar' 
                      ? <>إن السردال ليس مجرد برمجيات، بل هو <span className="text-primary-container">فعل سيادي</span> يعيد امتلاك مستقبلنا الرقمي.</>
                      : <>Sardal is not just software; it is a <span className="text-primary-container">sovereign act</span> to reclaim our digital future.</>
                    }
                  </p>
                  
                  <div className="h-px w-24 bg-primary/30 mx-auto" />
                  
                  <p className="text-lg md:text-xl text-on-surface-variant max-w-3xl mx-auto leading-relaxed font-medium">
                    {activeLang === 'ar'
                      ? "نحن نؤمن بأن السيادة الرقمية هي حق أساسي لكل أمة تسعى للحفاظ على قيمها وهويتها في عصر الذكاء الاصطناعي."
                      : "We believe that digital sovereignty is a fundamental right for every nation seeking to preserve its values and identity in the age of Artificial Intelligence."
                    }
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-20 flex flex-wrap items-center justify-center gap-12 border-t border-white/5 pt-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                <div className="flex flex-col items-center">
                  <Shield className="w-10 h-10 mb-2 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Protection</span>
                </div>
                <div className="flex flex-col items-center">
                  <Compass className="w-10 h-10 mb-2 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Direction</span>
                </div>
                <div className="flex flex-col items-center">
                  <Monitor className="w-10 h-10 mb-2 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Visibility</span>
                </div>
                <div className="flex flex-col items-center">
                  <Award className="w-10 h-10 mb-2 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Excellence</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Corporate Footer */}
      <footer className="glass border-t border-white/5 pt-20 pb-12 mt-20 relative overflow-hidden backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-16 mb-20 relative z-10">
           <div className="col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <SardalWheel className="w-12 h-12" />
                <div className="flex flex-col">
                  <span className="text-3xl font-black tracking-tighter">SARDAL<span className="text-primary-container">OS</span></span>
                  <span className="arabic text-sm font-bold opacity-70">نظام السردال السيادي</span>
                </div>
              </div>
              <p className="text-on-surface-variant text-sm max-w-sm mb-8 font-medium">
                Sardal OS is the cornerstone of Kuwaiti digital autonomy, providing a secure foundation for the Arabic-Islamic knowledge economy.
              </p>
              <div className="flex gap-4">
                {FLAG_COLORS.map(c => (
                  <div key={c.hex} className="w-10 h-1 rounded-full" style={{ backgroundColor: c.hex }} />
                ))}
              </div>
           </div>
           
           <div>
             <h5 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary mb-8">Sovereignty</h5>
             <div className="space-y-4 text-sm font-medium text-on-surface-variant">
               <a href="#" className="block hover:text-white transition-colors">Privacy Core</a>
               <a href="#" className="block hover:text-white transition-colors">Local Residency</a>
               <a href="#" className="block hover:text-white transition-colors">Post-Quantum Sec</a>
               <a href="#" className="block hover:text-white transition-colors">Arabic Ethics</a>
             </div>
           </div>

           <div>
             <h5 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary mb-8">Access</h5>
             <div className="space-y-4 text-sm font-medium text-on-surface-variant">
               <a href="#" className="block hover:text-white transition-colors">Gov Portal</a>
               <a href="#" className="block hover:text-white transition-colors">Institution Log</a>
               <a href="#" className="block hover:text-white transition-colors">Developer SDK</a>
               <a href="#" className="block hover:text-white transition-colors">Technical Spec</a>
             </div>
           </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5 pt-8">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-outline">
            © 2026 SARDAL OPERATIONS | COHESION HOLDING | STATE OF KUWAIT
          </div>
          
          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-outline">
             <div className="flex items-center gap-2">
                <Bookmark className="w-3 h-3" />
                <span>Confidential_Kit_5.0</span>
             </div>
             <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                <ExternalLink className="w-3 h-3" />
                <span>Primary_Mirror</span>
             </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
