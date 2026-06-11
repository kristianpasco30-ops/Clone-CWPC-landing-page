'use client'

import { useState, useEffect, useRef, type ReactNode } from 'react'
import Image from 'next/image'
import heroCampus from '../../public/hero-campus.png'
import cwpcLogo from '../../public/cwpc-logo.png'
import wholeCampus from '../../public/whole-campus.jpg'
import {
  Menu,
  X,
  Sun,
  Moon,
  GraduationCap,
  BookOpen,
  UtensilsCrossed,
  Plane,
  Briefcase,
  Landmark,
  ClipboardList,
  Scale,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Clock,
  ChevronRight,
  Users,
  Award,
  Building2,
  Star,
  ArrowUp,
  Heart,
  CheckCircle2,
  Shield,
  Globe,
  BookOpenCheck,
  ImageIcon,
} from 'lucide-react'
import { useTheme } from 'next-themes'

/* ─── Intersection Observer Hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ─── Animated Section Wrapper ─── */
function Section({ id, children, className = '', delay = 0 }: { id: string; children: ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView()
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  )
}

/* ─── Programs Data ─── */
const PROGRAMS = [
  { abbr: 'BSED', name: 'Bachelor of Secondary Education', desc: 'Prepare to become an effective secondary school teacher with comprehensive pedagogical training and subject expertise.', icon: GraduationCap, color: 'from-emerald-600 to-emerald-500' },
  { abbr: 'BEED', name: 'Bachelor of Elementary Education', desc: 'Develop the skills to nurture and educate young learners in elementary school settings.', icon: BookOpen, color: 'from-emerald-600 to-emerald-500' },
  { abbr: 'BSHM', name: 'BS in Hospitality Management', desc: 'Master the art of hospitality with hands-on training in hotel and restaurant management.', icon: UtensilsCrossed, color: 'from-emerald-600 to-emerald-500' },
  { abbr: 'BSTM', name: 'BS in Tourism Management', desc: 'Explore the world of tourism and travel management with industry-ready skills.', icon: Plane, color: 'from-emerald-600 to-emerald-500' },
  { abbr: 'BSBA', name: 'BS in Business Administration', desc: 'Build a strong foundation in business principles, management, and entrepreneurship.', icon: Briefcase, color: 'from-emerald-600 to-emerald-500' },
  { abbr: 'BSPA', name: 'BS in Public Administration', desc: 'Learn to lead and manage public service organizations with integrity and efficiency.', icon: Landmark, color: 'from-emerald-600 to-emerald-500' },
  { abbr: 'BSOA', name: 'BS in Office Administration', desc: 'Become proficient in modern office management, technology, and administrative processes.', icon: ClipboardList, color: 'from-emerald-600 to-emerald-500' },
  { abbr: 'BSCRIM', name: 'BS in Criminology', desc: 'Pursue a career in law enforcement and criminal justice with comprehensive training.', icon: Scale, color: 'from-emerald-600 to-emerald-500' },
]

/* ─── SHS Strands ─── */
const SHS_STRANDS = [
  { name: 'GAS', desc: 'General Academic Strand' },
  { name: 'ABM', desc: 'Accountancy, Business, and Management' },
  { name: 'Tech-Voc', desc: 'Technical-Vocational-Livelihood' },
  { name: 'HUMSS', desc: 'Humanities and Social Sciences' },
  { name: 'STEM', desc: 'Science, Technology, Engineering, and Mathematics' },
]

/* ─── Campus Data ─── */
const CAMPUS = [
  { title: 'Classrooms', desc: 'Spacious, well-ventilated classrooms equipped with modern teaching aids.', img: '/campus-classrooms.png' },
  { title: 'Computer Labs', desc: 'State-of-the-art computer laboratories with up-to-date hardware and software.', img: '/campus-computer-lab.png' },
  { title: 'Library', desc: 'A comprehensive collection of books, journals, and digital resources for research.', img: '/campus-library.png' },
  { title: 'Cafeteria', desc: 'Clean and affordable cafeteria serving nutritious meals to students and faculty.', img: '/campus-cafeteria.png' },
]

/* ─── Why CWPC Features ─── */
const FEATURES = [
  { icon: Award, title: 'CHED Recognized Programs', desc: 'Programs fully recognized by the Commission on Higher Education.' },
  { icon: Users, title: 'Supportive Community', desc: 'A close-knit academic family where every student matters and receives personal attention.' },
  { icon: Shield, title: 'Located in Ternate, Cavite', desc: 'A secure and conducive learning environment in a peaceful town with a low-crime rate.' },
  { icon: Globe, title: 'Industry Connections', desc: 'Partnerships with local businesses and organizations for on-the-job training.' },
  { icon: BookOpenCheck, title: 'Affordable Tuition', desc: 'Quality education at accessible rates, making your dreams achievable.' },
  { icon: Star, title: 'Proven Track Record', desc: '25+ years of producing competent graduates who contribute to society.' },
]

/* ─── Navigation ─── */
const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'programs', label: 'College Programs' },
  { id: 'shs', label: 'SHS' },
  { id: 'campus', label: 'Campus' },
  { id: 'why-cwpc', label: 'Why CWPC' },
  { id: 'enroll', label: 'Enroll' },
  { id: 'contact', label: 'Contact' },
]

/* ─── Main Page ─── */
export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Delay setting mounted to avoid synchronous setState in effect
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY)
      // Scroll spy
      for (const link of [...NAV_LINKS].reverse()) {
        const el = document.getElementById(link.id)
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(link.id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  const isScrolled = scrollY > 50

  return (
    <div className="min-h-screen">
      {/* ─── Top Navigation Bar ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg shadow-emerald-500/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <button onClick={() => scrollTo('home')} className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 relative">
                <Image
                  src={cwpcLogo}
                  alt="CWPC Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className={`text-lg font-extrabold tracking-wide transition-colors ${isScrolled ? 'text-emerald-700 dark:text-emerald-400' : 'text-white'}`}>
                  CWPC
                </span>
                <span className={`text-[10px] leading-none -mt-0.5 font-medium tracking-wider uppercase transition-colors ${isScrolled ? 'text-gray-500 dark:text-gray-400' : 'text-emerald-200'}`}>
                  Est. 2000
                </span>
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeSection === link.id
                      ? isScrolled
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400'
                        : 'bg-white/15 text-white'
                      : isScrolled
                        ? 'text-gray-600 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        : 'text-emerald-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={`p-2 rounded-lg transition-all ${
                    isScrolled
                      ? 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
                      : 'hover:bg-white/10 text-emerald-100 hover:text-white'
                  }`}
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              )}
              <button
                onClick={() => scrollTo('enroll')}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-sm font-semibold rounded-lg shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
              >
                Enroll Now <ChevronRight className="w-4 h-4" />
              </button>
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden p-2 rounded-lg transition-all ${
                  isScrolled
                    ? 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
                    : 'hover:bg-white/10 text-white'
                }`}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-xl animate-fade-in">
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeSection === link.id
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('enroll')}
                className="w-full mt-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm font-semibold rounded-lg text-center"
              >
                Enroll Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ─── Hero Section ─── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroCampus}
            alt="CWPC Campus"
            fill
            priority
            sizes="100vw"
            className="object-cover backdrop-blur-[2px]"
          />
          {/* Dark overlay for contrast */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-32">
          {/* Content floating without a container box */}
          <div className="animate-fade-in-up p-8 md:p-12 mb-10 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
              Cavite West Point
            </h1>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-medium text-white mb-8 drop-shadow-md">
              College
            </h2>
            <p className="text-base sm:text-xl text-white font-medium max-w-xl mx-auto mb-10 leading-relaxed drop-shadow-md">
              Dedicated to shaping the future leaders of tomorrow through holistic and quality education.
            </p>
            <div className="flex flex-col gap-4 justify-center sm:flex-row">
              <button
                onClick={() => scrollTo('programs')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1a472a] text-white font-semibold rounded-lg hover:bg-[#143621] transition-all text-base"
              >
                Explore Programs
              </button>
              <button
                onClick={() => scrollTo('about')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all text-base"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Stats Bar - Minimal black/grey cards */}
          <div className="animate-fade-in-up animation-delay-500 mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { num: '1,000+', label: 'Students' },
              { num: '30+', label: 'Faculty' },
              { num: '8+', label: 'Programs' },
              { num: '25+', label: 'Years' },
            ].map((s, i) => (
              <div key={i} className="bg-black/40 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
                <div className="text-2xl md:text-3xl font-bold text-white">{s.num}</div>
                <div className="text-xs text-white/70 uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <button onClick={() => scrollTo('about')} className="flex flex-col items-center gap-1 text-emerald-200/70 hover:text-white transition-colors">
            <span className="text-xs font-medium tracking-wider uppercase">Scroll Down</span>
            <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1">
              <div className="w-1.5 h-3 bg-current rounded-full animate-bounce" />
            </div>
          </button>
        </div>
      </section>

      {/* ─── About Section ─── */}
      <Section id="about" className="py-20 md:py-28 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-4">
                <Building2 className="w-4 h-4" /> About Us
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                A Legacy of{' '}
                <span className="gradient-text">Excellence</span>{' '}
                in Education
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                Cavite West Point College (CWPC) has been a beacon of quality education in Ternate, Cavite since 2000. For over 25 years, we have been committed to nurturing minds, building character, and preparing students for meaningful careers.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                Our dedicated faculty, modern facilities, and supportive community create an environment where every student can thrive. We believe in accessible education that transforms lives and uplifts communities.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: CheckCircle2, text: 'CHED Recognized Programs' },
                  { icon: CheckCircle2, text: 'Experienced Faculty' },
                  { icon: CheckCircle2, text: 'Modern Facilities' },
                  { icon: CheckCircle2, text: 'Affordable Tuition' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <item.icon className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/10 relative h-[400px] md:h-[480px] aspect-video">
              <Image
                src={wholeCampus.src}
                alt="CWPC Campus"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 flex items-center gap-3 animate-pulse-glow">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-extrabold text-gray-900 dark:text-white">25+ Years</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── College Programs Section ─── */}
      <Section id="programs" className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-4">
              <GraduationCap className="w-4 h-4" /> Academic Programs
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
              Our <span className="gradient-text">College Programs</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Choose from 8 comprehensive degree programs designed to prepare you for a successful career.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROGRAMS.map((prog, i) => (
              <div
                key={i}
                className="hover-card bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden group"
              >
                <div className={`h-2 bg-gradient-to-r ${prog.color}`} />
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${prog.color} flex items-center justify-center flex-shrink-0`}>
                      <prog.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">
                        {prog.abbr}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm leading-snug">
                    {prog.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {prog.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── Senior High School Section ─── */}
      <Section id="shs" className="py-20 md:py-28 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-4">
              <GraduationCap className="w-4 h-4" /> Senior High School
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
              New SHS <span className="gradient-text">Curriculum</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
              The Department of Education (DepEd) has fully rolled out the Strengthened Senior High School (SHS) Curriculum. Fixed strands (like STEM, ABM, and HUMSS) are removed. Instead, students choose from two main tracks—<strong>Academic</strong> and <strong>Technical-Professional (TechPro)</strong>—while selecting from flexible electives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-emerald-50 dark:bg-gray-800 rounded-xl p-8 border border-emerald-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-4">Academic Track</h3>
              <p className="text-gray-600 dark:text-gray-300">Focused on preparing students for college-level education through rigorous academic subjects and flexible electives.</p>
            </div>
            <div className="bg-emerald-50 dark:bg-gray-800 rounded-xl p-8 border border-emerald-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-4">Tech-Professional Track</h3>
              <p className="text-gray-600 dark:text-gray-300">Designed to equip students with industry-ready skills for immediate employment, entrepreneurship, or further technical training.</p>
            </div>
          </div>

          <div className="bg-emerald-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl shadow-emerald-500/20">
            <h3 className="text-2xl font-bold mb-4">Why Enroll in our SHS?</h3>
            <p className="text-emerald-100 text-lg mb-4 max-w-2xl mx-auto">
              Enjoy <strong>Free Tuition</strong>. Plus, every enrollee receives a complete set of school uniform, P.E. uniform, and a school ID.
            </p>
            <div className="mt-8 text-left bg-white/10 p-6 rounded-xl max-w-xl mx-auto">
              <h4 className="font-bold text-lg mb-3">Requirements:</h4>
              <ul className="list-disc list-inside space-y-1.5 text-emerald-50">
                <li>Birth certificate</li>
                <li>Form 137</li>
                <li>Good moral character</li>
                <li>Learner Reference Number (LRN)</li>
              </ul>
            </div>
            <div className="mt-8">
              <button
                onClick={() => scrollTo('enroll')}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-emerald-700 font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
              >
                Enroll in SHS Now <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Campus Section ─── */}
      <Section id="campus" className="py-20 md:py-28 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-4">
              <Building2 className="w-4 h-4" /> Our Campus
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
              Explore Our <span className="gradient-text">Facilities</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Modern facilities designed to support effective learning and student development.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CAMPUS.map((item, i) => (
              <div key={i} className="group rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover-card">
                <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-100 dark:bg-gray-700 flex flex-col items-center justify-center">
                  {item.img.startsWith('/') && !item.img.includes('campus-') ? (
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <ImageIcon className="w-12 h-12 mb-2" />
                      <span className="text-sm font-medium">Image Coming Soon</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{item.title}</h3>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── Why CWPC Section ─── */}
      <Section id="why-cwpc" className="py-20 md:py-28 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white text-sm font-semibold mb-4">
              <Star className="w-4 h-4" /> Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Why Choose <span style={{ color: '#a7f3d0' }}>CWPC</span>?
            </h2>
            <p className="text-emerald-100/90 text-lg max-w-2xl mx-auto">
              Here&apos;s what makes Cavite West Point College the right choice for your education.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat, i) => (
              <div key={i} className="glass-card rounded-xl p-6 hover:bg-white/15 transition-all group">
                <div className="w-12 h-12 rounded-lg bg-white/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-emerald-100/80 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── Enrollment Section ─── */}
      <Section id="enroll" className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
              Start Your <span className="gradient-text">Journey</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* College Enrollment */}
            <div className="flex flex-col h-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-6 text-emerald-700 dark:text-emerald-400">College Programs</h3>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Steps:</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                  <li>Visit the Campus</li>
                  <li>Prepare Requirements</li>
                  <li>Submit & Register</li>
                  <li>Pay Registration Fee (₱1,000)</li>
                  <li>Enrollment Confirmed</li>
                </ol>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Requirements:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
                  <li>Original and photocopy of birth certificate</li>
                  <li>High school diploma</li>
                  <li>Transcript of records</li>
                  <li>2x2 photos</li>
                </ul>
              </div>
              <div className="mt-auto pt-6">
                <button className="w-full bg-[#4CAF50] text-white py-3 rounded-lg font-bold hover:bg-[#45a049] transition-colors">
                  Enroll in College
                </button>
              </div>
            </div>

            {/* SHS Enrollment */}
            <div className="flex flex-col h-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 relative">
              <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Free Tuition</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-6 text-emerald-700 dark:text-emerald-400">Senior High School</h3>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Steps:</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                  <li>Visit the Campus</li>
                  <li>Submit Requirements</li>
                  <li>Enrollment Confirmed — Free Tuition</li>
                </ol>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Requirements:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
                  <li>Birth certificate</li>
                  <li>Form 137</li>
                  <li>Good moral character certificate</li>
                  <li>Learner Reference Number (LRN)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Unified CTA */}
          <div className="flex justify-center mt-12">
            <a
              href="#contact"
              className="w-full sm:w-auto px-10 py-3 bg-[#4CAF50] hover:bg-[#45a049] text-white font-medium rounded-lg text-center transition-colors"
            >
              Get in Touch to Enroll
            </a>
          </div>

          {/* Important Reminders */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 md:p-8">
              <h3 className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2 mb-6 text-lg">
                <Clock className="w-5 h-5" /> Important Reminders (College Only)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-amber-100 dark:bg-amber-900/50 p-1.5 rounded-lg flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <p className="text-amber-900 dark:text-amber-100 text-sm md:text-base leading-relaxed">
                    Enrollment is done <strong>in person</strong> at the campus.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-amber-100 dark:bg-amber-900/50 p-1.5 rounded-lg flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <p className="text-amber-900 dark:text-amber-100 text-sm md:text-base leading-relaxed">
                    Registration fee: <strong>₱1,000</strong> (non-refundable).
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-amber-100 dark:bg-amber-900/50 p-1.5 rounded-lg flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <p className="text-amber-900 dark:text-amber-100 text-sm md:text-base leading-relaxed">
                    Office Hours: <strong>Mon to Fri, 8:00 AM – 5:00 PM</strong>.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-amber-100 dark:bg-amber-900/50 p-1.5 rounded-lg flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <p className="text-amber-900 dark:text-amber-100 text-sm md:text-base leading-relaxed">
                    Bring original documents for verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Contact Section ─── */}
      <Section id="contact" className="py-20 md:py-28 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-4">
              <Phone className="w-4 h-4" /> Contact Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Have questions? We&apos;d love to hear from you. Reach out to us through any of these channels.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Phone, label: 'Phone', value: '(046) 412 1865', href: 'tel:+63464121865', color: 'from-emerald-600 to-emerald-500' },
              { icon: Mail, label: 'Email', value: 'cwpcternate@yahoo.com', href: 'mailto:cwpcternate@yahoo.com', color: 'from-emerald-600 to-emerald-500' },
              { icon: MapPin, label: 'Location', value: 'Ternate, Cavite', href: 'https://maps.app.goo.gl/8i9BbWTM8NLusUJTA', color: 'from-emerald-600 to-emerald-500' },
              { icon: Facebook, label: 'Facebook', value: '@cwpccollegedept', href: 'https://www.facebook.com/cwpccollegedepartment', color: 'from-emerald-600 to-emerald-500' },
            ].map((c, i) => (
              <a
                key={i}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="hover-card bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 text-center group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <c.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">{c.label}</div>
                <div className="text-gray-700 dark:text-gray-200 font-bold text-sm">{c.value}</div>
              </a>
            ))}
          </div>

          {/* Map Embed */}
          <div className="mt-12 max-w-4xl mx-auto rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.654321!2d120.7247!3d14.2804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd77!2zMTTCsDE2JzQ5LjQiTiAxMjDCsDQzJzM2LjgiRQ!5e0!3m2!1sen!2sph!4v1717824000000!5m2!1sen!2sph"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CWPC Location"
              className="w-full h-[250px] md:h-[300px]"
            />
          </div>
        </div>
      </Section>

      {/* ─── Footer ─── */}
      <footer className="bg-gray-900 dark:bg-gray-950 border-t border-gray-800 text-center py-12">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <div className="flex flex-col items-center text-center mb-8">
            <Image
              src={cwpcLogo}
              alt="CWPC Logo"
              width={80}
              height={80}
              className="mb-3 w-16 h-16 md:w-20 md:h-20"
            />
            <h3 className="font-bold text-lg text-white">Cavite West Point College</h3>
            <p className="text-sm text-gray-400 mt-2 max-w-xs">
              Shaping future leaders through quality education since 2000. Located in the peaceful town of Ternate, Cavite.
            </p>
          </div>

          <a
            href="https://www.facebook.com/cwpccollegedepartment"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors mb-8"
          >
            <Facebook className="w-4 h-4" /> Follow us on Facebook
          </a>

          <div className="pt-8 border-t border-gray-800 flex flex-col items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Cavite West Point College. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for CWPC
            </p>
          </div>
        </div>
      </footer>

      {/* ─── Back to Top Button ─── */}
      {isScrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-full shadow-lg shadow-emerald-500/30 flex items-center justify-center hover:scale-110 transition-all animate-fade-in"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
