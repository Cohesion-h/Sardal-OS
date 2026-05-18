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
  Bookmark,
  Heart,
  Users
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
    tag: 'v0.6 Stable',
    title: 'Cognitive Core Shell',
    titleAr: 'النواة الإدراكية',
    desc: 'The stable processing unit for sovereign Arabic reasoning (SGL Semantic Interceptor).',
    descAr: 'وحدة المعالجة المستقرة للتفكير العربي السيادي (SGL Interceptor).',
    items: ['85-Term Lexical Shield', 'Cognitive Firewall', 'Defensive Loop v1']
  },
  {
    tag: 'Authentication',
    title: 'Galaf Layer v1.2',
    titleAr: 'طبقة القلاف للمصادقة',
    desc: 'Sovereign authentication layer built with zero external dependencies.',
    descAr: 'طبقة مصادقة سيادية مبنية بـ 504 أسطر كود دون تبعيات خارجية.',
    items: ['Ed25519 Signatures', 'NIST Standard Hashes', '10μs Auth Speed']
  },
  {
    tag: 'Protocol',
    title: 'Modulo-19 Logic',
    titleAr: 'بروتوكول موديلو-19',
    desc: 'Deterministic mathematical verification of AI outputs and root dictionary.',
    descAr: 'تحقق رياضي حتمي من المخرجات وقاموس الجذور الثلاثية.',
    items: ['17 Root Dictionary', 'Maqasid Evaluator', 'Deterministic Bus']
  }
];

const PILLARS = [
  { 
    title: 'Morphological Segmentation', 
    ar: 'التقطيع الصرفي الجذري', 
    desc: 'Arabic triliteral roots as the base building block, avoiding statistical translation errors.',
    descAr: 'العربية كوحدة بناء أساسية عبر الجذور الثلاثية لا الترجمة الإحصائية.'
  },
  { 
    title: 'Al-Qistas Balance', 
    ar: 'هندسة القسطاس', 
    desc: 'Balanced resource distribution using mathematical architectures and golden ratios.',
    descAr: 'توزيع متوازن للموارد والانتباه بمعمارية رياضية موثقة.'
  },
  { 
    title: 'Modulo-19 Protocol', 
    ar: 'بروتوكول موديلو 19', 
    desc: 'Deterministic mathematical verification layer for all system outputs and integrity.',
    descAr: 'تحقق رياضي حتمي من المخرجات لضمان سلامة البيانات.'
  },
  { 
    title: 'Cognitive Firewall', 
    ar: 'جدار الحماية الإدراكي', 
    desc: 'Shielding national linguistic models from cultural pollution and prompt injection.',
    descAr: 'حماية النماذج اللغوية الوطنية من التلوث الفكري والحقن السلبي.'
  }
];

const MAQASID = [
  { name: 'Faith', ar: 'حفظ الدين', icon: Shield },
  { name: 'Life', ar: 'حفظ النفس', icon: Heart },
  { name: 'Intellect', ar: 'حفظ العقل', icon: Cpu },
  { name: 'Lineage', ar: 'حفظ النسل', icon: Users },
  { name: 'Wealth', ar: 'حفظ المال', icon: Award },
];

const VISION_GOALS = [
  { title: 'Knowledge Economy', ar: 'الاقتصاد المعرفي السيادي', desc: 'Localization of IP and strategic licensing within Kuwait.' },
  { title: 'Secure Digital Shift', ar: 'التحول الرقمي الآمن', desc: 'Cognitive infrastructure where data never leaves national borders.' },
  { title: 'Human Capital', ar: 'تنمية الكوادر الوطنية', desc: 'Building the next generation of Kuwaiti sovereign AI engineers.' },
  { title: 'Identity Protection', ar: 'حماية الهوية الثقافية', desc: 'Linguistic models designed from the Arabic root up.' },
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
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3 shadow-2xl' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SardalWheel className="w-8 h-8" />
            <div className="flex flex-col leading-[0.85]">
              <span className="text-lg font-bold tracking-tight">Sardal <span className="text-primary-container">OS</span></span>
              <span className="arabic text-[9px] font-bold opacity-70">نظام السردال السيادي</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-6 text-[8px] font-bold uppercase tracking-widest text-on-surface-variant">
            <a href="#pillars" className="hover:text-primary transition-colors">Engineering</a>
            <a href="#status" className="hover:text-primary transition-colors">v0.6 Status</a>
            <a href="#maqasid" className="hover:text-primary transition-colors">Maqasid</a>
            <a href="#generation" className="hover:text-primary transition-colors">The Generation</a>
            <a href="#ip" className="hover:text-primary transition-colors">IP Assets</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveLang(activeLang === 'ar' ? 'en' : 'ar')}
              className="px-5 py-2 glass-bright rounded-lg text-[9px] font-bold tracking-widest uppercase flex items-center gap-2 hover:bg-surface-bright transition-colors"
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full glass-bright text-[9px] uppercase font-bold tracking-widest text-primary-container mb-8 shadow-inner border border-white/5">
                <Shield className="w-3.5 h-3.5" />
                Sardal Core Shell v0.6 | Project Overview
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter leading-none">
                Sardal <span className="text-primary-container">OS</span>
              </h1>

              <p className={`max-w-3xl mx-auto text-base md:text-lg text-on-surface-variant leading-relaxed mb-12 font-medium ${activeLang === 'ar' ? 'arabic tracking-wide' : 'tracking-tight'}`}>
                {activeLang === 'ar' 
                  ? 'بناء نظام ذكاء اصطناعي سيادي كامل للأمة العربية والإسلامية، يحفظ الهوية والفطرة، ويخدم السيادة الوطنية، ويعمل محلياً بالكامل دون أي اعتماد على بنى تحتية أجنبية.'
                  : 'A fully sovereign Arabic-Islamic AI operating system designed to protect cognitive sovereignty and national digital independence with zero dependency on foreign cloud.'
                }
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-primary-container text-on-primary-container font-bold uppercase tracking-widest text-[9px] rounded-md shadow-xl hover:bg-primary transition-all active:scale-95">
                  {activeLang === 'ar' ? 'نظرة عامة على المشروع' : 'Strategic Overview'}
                </button>
                <button className="w-full sm:w-auto px-8 py-4 glass-bright font-bold uppercase tracking-widest text-[9px] rounded-md hover:bg-surface-bright transition-all border border-white/10">
                  {activeLang === 'ar' ? 'رؤية كويت 2035' : 'New Kuwait 2035'}
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

        {/* 4 Engineering Pillars */}
        <section id="pillars" className="py-24 max-w-7xl mx-auto px-6">
          <SectionHeading 
            arabic="الركائز هندسية الأربعة" 
            subtitle="The fundamental technological pillars powering the Sardal Engine."
            subtitleAr="المرتكبات التقنية الأساسية التي يقوم عليها محرك السردال."
          >
            Engineering Pillars
          </SectionHeading>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((pillar, i) => (
              <motion.div 
                key={pillar.title}
                whileHover={{ y: -4 }}
                className="glass p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl brushed-metal flex items-center justify-center text-primary-container mb-6">
                   {i === 0 ? <Type className="w-5 h-5" /> : i === 1 ? <Compass className="w-5 h-5" /> : i === 2 ? <CheckCircle className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                </div>
                <h4 className="text-sm font-bold mb-1">{pillar.title}</h4>
                <p className="arabic text-sm text-primary-container mb-4">{pillar.ar}</p>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  {activeLang === 'ar' ? pillar.descAr : pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Operational Core (v0.6) */}
        <section id="status" className="py-24 bg-surface-container/20 border-y border-outline-variant/10">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading 
              arabic="النواة التشغيلية (v0.6)" 
              subtitle="Current operational status of key system modules and living cognitive layers."
              subtitleAr="الحالة التشغيلية الحالية للقطاعات الأساسية ووحدات البحث النشطة."
            >
              Operational Core
            </SectionHeading>

            <div className="grid lg:grid-cols-3 gap-8 relative">
              {[
                {
                  tag: 'Cognitive Core',
                  title: 'Stable Engine',
                  titleAr: 'المحرك المستقر',
                  desc: 'The primary linguistic processor handling high-fidelity Arabic morphological parsing.',
                  descAr: 'المعالج اللغوي الأساسي الذي يتعامل مع التحليل الصرفي العربي عالي الدقة.',
                  items: ['Morphological Tunnels', 'Contextual Memory', 'Root Isolation']
                },
                {
                  tag: 'Sovereign Auth',
                  title: 'Galaf v1.2',
                  titleAr: 'طبقة جلاف v1.2',
                  desc: 'Enterprise-grade identity verification and sovereign credential management.',
                  descAr: 'إدارة الهوية والاعتمادات السيادية لمستوى المؤسسات الحكومية.',
                  items: ['Zero-Trust Shell', 'PQC Ready', 'Identity Shield']
                },
                {
                  tag: 'Digital Shield',
                  title: 'Lexical Guard',
                  titleAr: 'الحارس المعجمي',
                  desc: 'Real-time monitoring of AI outputs to ensure ethical and cultural alignment.',
                  descAr: 'مراقبة فورية لمخرجات الذكاء الاصطناعي لضمان التوافق القيمي.',
                  items: ['Maqasid Grader', 'Injection Block', 'Root Filter']
                }
              ].map((phase) => (
                <div 
                  key={phase.tag}
                  className="glass p-8 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[9px] font-bold tracking-widest text-primary-container uppercase px-2 py-1 bg-primary/10 rounded-md">{phase.tag}</span>
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">{phase.title}</h3>
                  <p className="arabic text-lg text-primary font-bold mb-4">{phase.titleAr}</p>
                  <p className="text-[11px] text-on-surface-variant mb-8 leading-relaxed font-medium min-h-[3rem]">
                    {activeLang === 'ar' ? phase.descAr : phase.desc}
                  </p>
                  <div className="space-y-3">
                    {phase.items.map(item => (
                      <div key={item} className="flex items-center gap-3 text-[10px] font-bold text-outline">
                        <CheckCircle className="w-3.5 h-3.5 text-primary" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Al-Qistas Maqasid Framework */}
        <section id="maqasid" className="py-24 max-w-7xl mx-auto px-6">
          <SectionHeading 
            arabic="إطار المقاصد والقيم" 
            subtitle="The ethical compass ensuring all AI decisions align with fundamental Islamic value pillars."
            subtitleAr="البوصلة الأخلاقية التي تضمن توافق جميع قرارات الذكاء الاصطناعي مع ركائز القيم الإسلامية الأساسية."
          >
            Ethical Framework
          </SectionHeading>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {MAQASID.map((m) => (
              <div key={m.name} className="glass p-6 rounded-xl flex flex-col items-center gap-4 text-center hover:border-primary/30 transition-all border border-white/5">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <m.icon className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-1">{m.name}</p>
                   <p className="arabic text-sm font-bold text-white">{m.ar}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* New Kuwait 2035 Alignment */}
        <section className="py-24 bg-surface-container/30 border-y border-outline-variant/10">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading 
              arabic="التوافق مع رؤية كويت جديدة 2035" 
              subtitle="Directly supporting Kuwait's national vision for a smart, diversified knowledge economy."
              subtitleAr="دعم رؤية الكويت الوطنية مباشرة لاقتصاد معرفي ذكي ومتنوع."
            >
              National Alignment
            </SectionHeading>

            <div className="grid md:grid-cols-4 gap-6">
              {VISION_GOALS.map(goal => (
                <div key={goal.title} className="p-6 glass rounded-2xl border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-all" />
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-2">{goal.title}</h4>
                  <p className="arabic text-sm font-bold text-primary-container mb-3">{goal.ar}</p>
                  <p className="text-[10px] text-on-surface-variant leading-relaxed font-medium">{goal.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sovereign Generation Path */}
        <section id="generation" className="py-24 max-w-7xl mx-auto px-6">
          <SectionHeading 
            arabic="مسار الرعيل السيادي" 
            subtitle="Building a generation of Kuwaiti sovereign AI engineers and strategic architects."
            subtitleAr="إطار عملي منظم لبناء جيل من الكوادر الوطنية المؤهلة في الذكاء الاصطناعي السيادي."
          >
            Sovereign Generation
          </SectionHeading>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Seed Phase', ar: 'مرحلة الغرس', desc: 'University and youth outreach to identify potential architects.' },
              { step: '02', title: 'Incubation', ar: 'مرحلة الاحتضان', desc: 'Deep technical immersion in the Sardal Core architecture.' },
              { step: '03', title: 'Empowerment', ar: 'مرحلة التمكين', desc: 'Direct contribution to national sovereign security shells.' },
              { step: '04', title: 'Governance', ar: 'مرحلة القيادة', desc: 'Strategic roles within the high-stakes national AI council.' }
            ].map((path) => (
              <div key={path.step} className="p-6 glass rounded-xl border border-white/5 relative group hover:border-primary/20 transition-all">
                <span className="text-[10px] font-bold text-primary mb-4 block">{path.step}</span>
                <h5 className="text-sm font-bold mb-1">{path.title}</h5>
                <p className="arabic text-sm font-bold text-primary-container mb-4">{path.ar}</p>
                <p className="text-[10px] text-on-surface-variant leading-relaxed">{path.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* IP & Recognition */}
        <section id="ip" className="py-24 max-w-7xl mx-auto px-6">
          <SectionHeading 
            arabic="الملكية الفكرية والابتكار" 
            subtitle="Registered trademarks and patentable strategic assets developed entirely in-house."
            subtitleAr="العلامات التجارية المسجلة والأصول الاستراتيجية المسجلة كبراءات اختراع."
          >
            Intellectual Assets
          </SectionHeading>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass p-6 rounded-xl border-l-2 border-l-primary flex flex-col gap-3">
              <span className="text-[8px] font-bold tracking-[0.2em] text-outline uppercase">Patent Roadmap</span>
              <p className="text-3xl font-black">11</p>
              <p className="arabic text-lg font-bold text-primary-container">ابتكارات قابلة للتسجيل</p>
              <p className="text-[10px] text-on-surface-variant font-medium">7 architectural patents + 4 future-tier innovations.</p>
            </div>
            <div className="glass p-6 rounded-xl border-l-2 border-l-primary flex flex-col gap-3">
              <span className="text-[8px] font-bold tracking-[0.2em] text-outline uppercase">Strategic Value</span>
              <p className="text-3xl font-black">130+</p>
              <p className="arabic text-lg font-bold text-primary-container">صفحة توثيق استراتيجي</p>
              <p className="text-[10px] text-on-surface-variant font-medium">Full strategic, legal, and financial framework mapping.</p>
            </div>
            <div className="glass p-6 rounded-xl border-l-2 border-l-primary flex flex-col gap-3">
              <span className="text-[8px] font-bold tracking-[0.2em] text-outline uppercase">Trade Protection</span>
              <p className="text-3xl font-black">16</p>
              <p className="arabic text-lg font-bold text-primary-container">علامة تجارية جاهزة</p>
              <p className="text-[10px] text-on-surface-variant font-medium">Marks prepared for local and regional GCC registration.</p>
            </div>
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
                    { title: 'Galaf Auth v1.2', ar: 'طبقة المصادقة السيادية جالاف', icon: Lock, tag: 'CORE_AUTH' },
                    { title: 'Cognitive Core Stable', icon: Cpu, ar: 'النواة الإدراكية المستقرة', tag: 'STABLE_V0.6' },
                    { title: 'Governance Command Center', ar: 'مركز القيادة والتحكم', icon: Monitor, tag: 'Tier 4' }
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

      {/* Footer & Contact */}
      <footer className="pt-24 border-t border-outline-variant/10 relative overflow-hidden bg-surface-container/20">
        {/* Kuwait Flag Decorative Rail */}
        <div className="flex h-1.5 w-full">
           <div className="flex-1 bg-[#007a3d]" />
           <div className="flex-1 bg-white" />
           <div className="flex-1 bg-[#ce1126]" />
           <div className="flex-1 bg-black" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <SardalWheel className="w-8 h-8" />
                <span className="text-lg font-bold tracking-normal uppercase">Sardal OS</span>
              </div>
              <p className="text-sm text-on-surface-variant max-w-md leading-relaxed font-medium mb-8">
                {activeLang === 'ar' 
                  ? 'مشروع وطني استراتيجي يهدف إلى بناء بنية تحتية سيادية للذكاء الاصطناعي في دولة الكويت، يركز على الحفاظ على أعلى مستويات الأمان والسيادة الرقمية.'
                  : 'A strategic national project aimed at building a sovereign AI infrastructure in Kuwait, focusing on maintaining the highest levels of digital security and sovereignty.'}
              </p>
              <div className="flex gap-4">
                <a href="mailto:cohesionkw@gmail.com" className="p-3 glass rounded-lg hover:bg-surface-bright transition-colors text-primary border border-white/5">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-8">System Authority</h5>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-bold text-white">Sardal Operations</span>
                <span className="arabic text-sm text-primary-container font-bold">عمليات السردال</span>
                <span className="text-[10px] font-bold text-outline uppercase mt-2">Sovereign Cognitive Shell</span>
              </div>
            </div>

            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-8">Connect</h5>
              <div className="flex flex-col gap-4 text-xs font-bold">
                <a href="mailto:cohesionkw@gmail.com" className="hover:text-primary transition-colors flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  cohesionkw@gmail.com
                </a>
                <div className="flex items-center gap-3 text-outline">
                  <div className="w-2 h-2 rounded-full bg-outline-variant" />
                  Kuwait City, KW
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-outline-variant/5 text-[9px] font-bold uppercase tracking-[0.2em] text-outline text-center md:text-left">
            <p>All Rights Reserved © 2026 Cohesion Holding</p>
            <div className="flex gap-8 mt-4 md:mt-0 items-center justify-center">
               <span className="text-primary tracking-normal font-sans">
                 SARDAL_CORE_SHELL_V0.6
               </span>
               <span className="text-on-surface">Kuwait 2035 Compliant</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
