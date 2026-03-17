/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, ArrowRight, Menu, X, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// --- Types & Data ---

interface EventCardData {
  image: string;
  tag: string;
  title: string;
  venue: string;
}

const events: EventCardData[] = [
  {
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80',
    tag: 'Rooftop · 18 Apr',
    title: 'Industry Futures Panel',
    venue: 'Gowings Bar & Grill, CBD',
  },
  {
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=600&q=80',
    tag: 'Networking · 05 May',
    title: 'The Art of Service',
    venue: 'Bennelong, Opera House',
  },
  {
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80',
    tag: 'Workshop · 22 May',
    title: 'Hospitality Tech 2026',
    venue: 'The Old Clare Hotel, Chippendale',
  },
  {
    image: 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&w=600&q=80',
    tag: 'Social · 12 Jun',
    title: 'Winter Solstice Soirée',
    venue: 'Maybe Sammy, The Rocks',
  },
];

interface MemberData {
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
}

const members: MemberData[] = [
  {
    name: 'Lachlan Murray',
    role: 'General Manager',
    company: 'The Fullerton Hotel Sydney',
    quote: 'YHL has been instrumental in connecting me with peers who are as passionate about the future of Sydney hospitality as I am.',
    image: 'https://i.pravatar.cc/150?u=lachlan',
  },
  {
    name: 'Sarah Chen',
    role: 'Director of F&B',
    company: 'Merivale Group',
    quote: 'The quality of conversations at YHL events is unmatched. It’s where the real industry movers and shakers meet.',
    image: 'https://i.pravatar.cc/150?u=sarah',
  },
  {
    name: 'James Harrison',
    role: 'Investment Analyst',
    company: 'Salter Brothers',
    quote: 'A sophisticated platform for emerging leaders. YHL bridges the gap between different sectors of the leisure economy.',
    image: 'https://i.pravatar.cc/150?u=james',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Operations Manager',
    company: 'BridgeClimb Sydney',
    quote: 'Being part of YHL means being at the forefront of tourism innovation in our beautiful city.',
    image: 'https://i.pravatar.cc/150?u=elena',
  },
  {
    name: 'Marcus Thorne',
    role: 'Founder',
    company: 'Thorne Hospitality Tech',
    quote: 'Networking that actually leads to collaboration. YHL is the heartbeat of Sydney’s next-gen hospitality scene.',
    image: 'https://i.pravatar.cc/150?u=marcus',
  },
  {
    name: 'Chloe Watson',
    role: 'Marketing Director',
    company: 'QT Hotels & Resorts',
    quote: 'Energetic, respected, and always at the best venues. YHL is the only community I prioritize every month.',
    image: 'https://i.pravatar.cc/150?u=chloe',
  },
];

const testimonials = [
  "YHL is the definitive space for Sydney's hospitality elite to connect, innovate, and lead.",
  "Real conversations, iconic venues, and a community that actually cares about the industry's future.",
  "Since 2022, YHL has redefined what professional networking looks like for the next generation."
];

// --- Components ---

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        
        if (dotRef.current) {
          gsap.to(dotRef.current, {
            x: clientX,
            y: clientY,
            duration: 0,
          });
        }
        
        if (ringRef.current) {
          gsap.to(ringRef.current, {
            x: clientX,
            y: clientY,
            duration: 0.15,
            ease: 'power2.out',
          });
        }

        const target = e.target as HTMLElement;
        if (target.closest('a, button, .interactive')) {
          document.body.classList.add('cursor-hover');
        } else {
          document.body.classList.remove('cursor-hover');
        }
      };

      window.addEventListener('mousemove', onMouseMove);
      return () => window.removeEventListener('mousemove', onMouseMove);
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
};

const MagneticButton = ({ children, className, primary = true }: { children: React.ReactNode, className?: string, primary?: boolean }) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const ctx = gsap.context(() => {
      const onMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power3.out',
        });
      };

      const onMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)',
        });
      };

      btn.addEventListener('mousemove', onMouseMove);
      btn.addEventListener('mouseleave', onMouseLeave);
      return () => {
        btn.removeEventListener('mousemove', onMouseMove);
        btn.removeEventListener('mouseleave', onMouseLeave);
      };
    });
    return () => ctx.revert();
  }, []);

  return (
    <button 
      ref={btnRef} 
      className={`${primary ? 'btn-primary' : 'btn-secondary'} ${className} interactive`}
    >
      {children}
    </button>
  );
};

const SectionHeading = ({ label, title, light = false }: { label: string, title: string, light?: boolean }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(headingRef.current, 
          { clipPath: 'inset(0 100% 0 0)' },
          { 
            clipPath: 'inset(0 0% 0 0)', 
            duration: 0.9, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
            }
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="mb-12">
      <p className={`label-caps mb-4 ${light ? 'text-gold' : 'text-gold'}`}>{label}</p>
      <h2 ref={headingRef} className={`text-4xl md:text-5xl lg:text-6xl ${light ? 'text-white' : 'text-navy'}`}>
        {title}
      </h2>
    </div>
  );
};

const StatNumber = ({ target, suffix }: { target: number, suffix: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obj = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        value: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 90%',
        },
        onUpdate: () => {
          setDisplayValue(Math.ceil(obj.value));
        }
      });
    });
    return () => ctx.revert();
  }, [target]);

  return (
    <span ref={ref} className="stat-number text-6xl md:text-7xl font-bold text-navy">
      {displayValue}{suffix}
    </span>
  );
};

const EventCard = ({ image, tag, title, venue }: any) => (
  <div className="flex-shrink-0 w-[300px] h-[380px] mx-4 group cursor-pointer transition-transform duration-500 hover:-translate-y-2">
    <div className="h-[55%] overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="h-[45%] bg-navy-light p-6 border-t border-gold flex flex-col justify-between group-hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-shadow duration-350">
      <div>
        <span className="label-caps text-gold border border-gold/30 px-3 py-1 inline-block mb-3">{tag}</span>
        <h3 className="text-xl text-white font-medium mb-1">{title}</h3>
        <p className="font-sans text-xs text-cream/70 font-light">{venue}</p>
      </div>
      <button className="text-gold label-caps text-[10px] border-b border-gold w-fit pb-1 group-hover:pr-4 transition-all duration-300">
        RSVP NOW
      </button>
    </div>
  </div>
);

const MemberCard = ({ member, index }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 90%',
          }
        }
      );
    }
  }, [index]);

  return (
    <div ref={cardRef} className="bg-white border border-[#E8E0D0] p-8 relative group hover:border-gold transition-colors duration-300">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full border-2 border-gold overflow-hidden">
          <img src={member.image} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div>
          <h4 className="text-xl font-semibold text-navy">{member.name}</h4>
          <p className="font-sans text-xs text-charcoal/75 font-light">{member.role} · {member.company}</p>
        </div>
      </div>
      <div className="relative">
        <span className="absolute -top-4 -left-2 text-6xl font-serif text-gold/30 pointer-events-none">"</span>
        <p className="font-sans text-sm italic text-navy/85 leading-relaxed relative z-10">
          {member.quote}
        </p>
      </div>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const heroH1Ref = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);

  const heroTitle = "Connect with Sydney's Next Hospitality Leaders";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Hero Animations ---
      if (heroH1Ref.current) {
        gsap.to('.hero-word', {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          delay: 0.5,
          ease: 'power3.out',
        });
      }

      // --- About Text Animation ---
      if (aboutTextRef.current) {
        const paragraphs = aboutTextRef.current.querySelectorAll('p');
        gsap.fromTo(paragraphs,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: aboutTextRef.current,
              start: 'top 80%',
            }
          }
        );
      }

      // --- Horizontal Rule Animation ---
      gsap.utils.toArray('.gold-rule').forEach((rule: any) => {
        gsap.fromTo(rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            transformOrigin: 'left',
            scrollTrigger: {
              trigger: rule,
              start: 'top 90%',
            }
          }
        );
      });
    });

    // --- Lenis Smooth Scroll ---
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- Navbar Scroll Effect ---
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setFormSubmitted(true);
    }, 1000);
  };

  return (
    <div className="relative selection:bg-gold selection:text-navy">
      <CustomCursor />

      {/* --- Navigation --- */}
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-navy/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-semibold text-gold font-serif">YHL</a>
          
          <div className="hidden md:flex items-center gap-10">
            <a href="#about" className="nav-link">About</a>
            <a href="#events" className="nav-link">Events</a>
            <a href="#community" className="nav-link">Community</a>
            <a href="#join" className="nav-link">Join</a>
            <MagneticButton className="!px-6 !py-2.5 !text-[11px] label-caps">Join Now</MagneticButton>
          </div>

          <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-white interactive">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-navy z-[200] flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="text-2xl font-semibold text-gold font-serif">YHL</span>
              <button onClick={() => setIsMenuOpen(false)} className="text-white">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {['About', 'Events', 'Community', 'Join'].map((item, i) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-serif text-white hover:text-gold transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto">
              <MagneticButton className="w-full">Join Now</MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Hero Section --- */}
      <section className="relative h-screen flex items-center bg-navy overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/80 to-navy/70 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80" 
            alt="Sydney Rooftop" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Floating Particles */}
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-10">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="particle" 
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${6 + Math.random() * 8}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-4xl">
            <div className="gold-rule w-20 h-[1px] bg-gold mb-8" />
            <h1 ref={heroH1Ref} className="text-[42px] md:text-[80px] lg:text-[96px] text-white leading-[1.05] font-light mb-8">
              {heroTitle.split(' ').map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.2em]">
                  <span className="hero-word inline-block translate-y-[100%] opacity-0">
                    {word}
                  </span>
                </span>
              ))}
            </h1>
            <p className="font-sans text-lg md:text-xl text-cream/85 font-light tracking-[0.4em] uppercase mb-12">
              Events at iconic venues · Real industry connections · Since 2022
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <MagneticButton>Explore Events</MagneticButton>
              <MagneticButton primary={false}>Get in Touch</MagneticButton>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce">
          <span className="label-caps text-[10px] text-gold">Scroll</span>
          <div className="w-[1px] h-10 bg-gold/50 relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gold animate-pulse" />
          </div>
        </div>
      </section>

      {/* --- About Section --- */}
      <section id="about" className="py-24 md:py-32 bg-cream">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-3/5" ref={aboutTextRef}>
              <SectionHeading label="WHO WE ARE" title="A Community Built on Real Industry Passion" />
              <div className="space-y-6">
                <p className="font-sans text-lg text-charcoal/80 leading-relaxed max-w-2xl">
                  YHL was founded in 2022 to bring together emerging professionals across hospitality, tourism, and leisure. We don't do sales pitches — we do real conversations at Sydney's best venues.
                </p>
                <div className="flex flex-wrap gap-3 pt-6">
                  {['Hotels', 'Tourism', 'F&B', 'Tech', 'Investment', 'Operations', 'Leisure'].map(tag => (
                    <span key={tag} className="bg-navy text-gold label-caps text-[10px] px-4 py-2">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:w-2/5 flex flex-col justify-center">
              <div className="space-y-12">
                {[
                  { target: 2022, label: 'Year Founded', suffix: '' },
                  { target: 7, label: 'Industry Sectors', suffix: '+' },
                  { target: 500, label: 'Leaders Connected', suffix: 's' }
                ].map((stat, i) => (
                  <div key={i} className="relative pb-8">
                    <div className="flex items-baseline gap-2">
                      <StatNumber target={stat.target} suffix={stat.suffix} />
                    </div>
                    <p className="font-sans text-sm text-charcoal/60 uppercase tracking-widest mt-2">{stat.label}</p>
                    {i < 2 && <div className="gold-rule absolute bottom-0 left-0 w-full h-[1px] bg-gold/30" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Events Section --- */}
      <section id="events" className="py-24 md:py-32 bg-navy overflow-hidden">
        <div className="container mx-auto px-6 mb-20">
          <SectionHeading label="UPCOMING EVENTS" title="Where Sydney's Hospitality Scene Meets" light />
        </div>

        <div className="space-y-8">
          {/* Row 1: Left */}
          <div className="marquee-container">
            <div className="marquee-content">
              {[...events, ...events].map((event, i) => (
                <EventCard 
                  key={i} 
                  image={event.image}
                  tag={event.tag}
                  title={event.title}
                  venue={event.venue}
                />
              ))}
            </div>
          </div>

          {/* Row 2: Right */}
          <div className="marquee-container">
            <div className="marquee-content-reverse">
              {[...events, ...events].map((event, i) => (
                <EventCard 
                  key={i} 
                  image={event.image}
                  tag={event.tag}
                  title={event.title}
                  venue={event.venue}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Community Section --- */}
      <section id="community" className="py-24 md:py-32 bg-cream">
        <div className="container mx-auto px-6">
          <SectionHeading label="OUR MEMBERS" title="Leaders Who Shape the Industry" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {members.map((member, i) => (
              <MemberCard key={i} member={member} index={i} />
            ))}
          </div>

          {/* Testimonial Slider */}
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              key="testimonial"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-serif italic text-navy leading-snug mb-8">
                "{testimonials[0]}"
              </h3>
              <p className="label-caps text-gold">FOUNDING VISION · 2022</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Join Us Section --- */}
      <section id="join" className="py-24 md:py-32 bg-navy">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="label-caps text-gold mb-4">BECOME A MEMBER</p>
            <h2 className="text-5xl md:text-6xl text-white font-light mb-6">Ready to Build Your Network?</h2>
            <p className="font-sans text-cream/80 text-lg">Join a community of respected professionals shaping the future of hospitality.</p>
          </div>

          <div className="max-w-xl mx-auto">
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-10">
                {[
                  { label: 'Full Name', type: 'text' },
                  { label: 'Email Address', type: 'email' },
                  { label: 'LinkedIn URL', type: 'url' },
                  { label: 'Your Role in Hospitality', type: 'text' }
                ].map((field, i) => (
                  <div key={i} className="relative group">
                    <input 
                      type={field.type} 
                      required
                      placeholder=" "
                      className="w-full bg-transparent border-b border-cream/40 py-3 text-white focus:outline-none focus:border-gold transition-colors peer"
                    />
                    <label className="absolute left-0 top-3 text-cream/60 font-sans pointer-events-none transition-all duration-300 peer-focus:-top-6 peer-focus:text-gold peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-gold peer-[:not(:placeholder-shown)]:text-xs">
                      {field.label}
                    </label>
                  </div>
                ))}
                <div className="relative group">
                  <textarea 
                    rows={3}
                    placeholder=" "
                    className="w-full bg-transparent border-b border-cream/40 py-3 text-white focus:outline-none focus:border-gold transition-colors peer resize-none"
                  />
                  <label className="absolute left-0 top-3 text-cream/60 font-sans pointer-events-none transition-all duration-300 peer-focus:-top-6 peer-focus:text-gold peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-gold peer-[:not(:placeholder-shown)]:text-xs">
                    Message
                  </label>
                </div>
                <button type="submit" className="w-full bg-gold text-navy font-semibold py-4 hover:bg-gold-muted transition-all duration-300 interactive">
                  Join the Community →
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <h3 className="text-4xl font-serif text-white mb-4">Welcome to YHL 🥂</h3>
                <div className="w-20 h-[1px] bg-gold mx-auto animate-pulse" />
                <p className="mt-6 text-cream/70 font-sans">We'll be in touch shortly to finalize your membership.</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-charcoal pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
            <div>
              <h4 className="text-2xl font-serif text-gold mb-4">YHL</h4>
              <p className="font-sans text-sm text-cream/60 leading-relaxed">
                For Sydney's Hospitality Future. Connecting the next generation of leaders since 2022.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="label-caps text-gold mb-2">Navigation</p>
              {['About', 'Events', 'Community', 'Join'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-cream/80 hover:text-gold transition-colors text-sm font-sans">
                  {item}
                </a>
              ))}
            </div>
            <div>
              <p className="label-caps text-gold mb-6">Connect</p>
              <a href="#" className="inline-block text-gold hover:scale-110 transition-transform duration-300">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          
          <div className="pt-10 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="font-sans text-[10px] text-cream/40 uppercase tracking-widest">
              © 2026 Young Hospitality Leaders · Sydney, Australia
            </p>
            <div className="flex gap-8">
              <a href="#" className="font-sans text-[10px] text-cream/40 uppercase tracking-widest hover:text-gold transition-colors">Privacy Policy</a>
              <a href="#" className="font-sans text-[10px] text-cream/40 uppercase tracking-widest hover:text-gold transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
