import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Music, 
  Users, 
  Star, 
  PlayCircle, 
  Mail, 
  Phone, 
  Menu, 
  X, 
  ChevronRight,
  Camera,
  Calendar,
  Image as ImageIcon
} from 'lucide-react';

// Custom Social Icons to replace the removed Lucide ones
const Instagram = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Facebook = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

// Reusable component for scroll-based fade-in animations
const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out will-change-transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const videoPlaylist = [
    { id: 1, title: "Main Showreel 2024", thumbnail: "https://images.unsplash.com/photo-1533174000220-11bfa010e9f1?q=80&w=2070&auto=format&fit=crop", duration: "2:45" },
    { id: 2, title: "Wedding Grand Entrance", thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop", duration: "1:20" },
    { id: 3, title: "Corporate Gala Hosting", thumbnail: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=2070&auto=format&fit=crop", duration: "3:10" },
    { id: 4, title: "Crowd Interaction & Comedy", thumbnail: "https://images.unsplash.com/photo-1470229722913-7c092db658cb?q=80&w=2070&auto=format&fit=crop", duration: "0:55" }
  ];
  const [activeVideo, setActiveVideo] = useState(videoPlaylist[0]);

  const galleryImages = [
    { id: 1, src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop", alt: "Crowd hyping up", span: "col-span-1 md:col-span-2 md:row-span-2" },
    { id: 2, src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop", alt: "Event lighting", span: "col-span-1 md:col-span-1" },
    { id: 3, src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1000&auto=format&fit=crop", alt: "Wedding speech", span: "col-span-1 md:col-span-1" },
    { id: 4, src: "https://images.unsplash.com/photo-1470229722913-7c092db658cb?q=80&w=1000&auto=format&fit=crop", alt: "DJ and MC on stage", span: "col-span-1 md:col-span-1" },
    { id: 5, src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1000&auto=format&fit=crop", alt: "Corporate event", span: "col-span-1 md:col-span-1 md:row-span-2" },
    { id: 6, src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop", alt: "Wedding party", span: "col-span-1 md:col-span-2" },
  ];

  // Handle scroll effect for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [lightboxImage]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = ['Home', 'About', 'Services', 'Media', 'Gallery', 'Testimonials'];

  return (
    <div className="font-sans text-stone-900 bg-stone-50 min-h-screen selection:bg-teal-600 selection:text-white">
      
      {/* Lightbox Overlay */}
      {lightboxImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/95 backdrop-blur-md animate-fade-in" onClick={() => setLightboxImage(null)}>
          <button 
            className="absolute top-6 right-6 text-white hover:text-teal-400 transition-colors bg-stone-800/50 rounded-full p-2"
            onClick={() => setLightboxImage(null)}
          >
            <X size={32} />
          </button>
          <img 
            src={lightboxImage} 
            alt="Enlarged gallery view" 
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-stone-900/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection('home')}>
              <span className={`text-2xl font-black tracking-tighter text-white`}>
                SHAWN<span className="text-teal-500">.</span>
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8 items-center">
              {navItems.map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium uppercase tracking-wider hover:text-teal-400 transition-colors ${isScrolled ? 'text-stone-300' : 'text-white/90'}`}
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105"
              >
                Book Now
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white"
              >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-stone-900 shadow-2xl">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {[...navItems, 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-3 py-4 text-white text-lg font-medium border-b border-stone-800 hover:text-teal-400"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop" 
            alt="Crowd cheering at event" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/70 to-stone-900/40"></div>
        </div>

        <FadeInSection className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <span className="block text-teal-400 font-bold tracking-widest uppercase mb-4">
            Seasoned Emcee & Event Host
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight drop-shadow-lg">
            JOY, LAUGHTER & <br className="hidden md:block"/> FLAWLESS EVENTS.
          </h1>
          <p className="text-xl md:text-2xl text-stone-200 mb-10 max-w-2xl mx-auto font-light">
            With a warm smile and quick wit, Shawn brings your celebrations to life—from the first welcome to the final farewell.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(13,148,136,0.4)] flex items-center justify-center gap-2"
            >
              Check Availability <Calendar size={20} />
            </button>
            <button 
              onClick={() => scrollToSection('media')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2"
            >
              Watch Reel <PlayCircle size={20} />
            </button>
          </div>
        </FadeInSection>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInSection delay={0}>
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10 group">
                  <img 
                    src="https://images.unsplash.com/photo-1493225457124-a1a2a5f5f468?q=80&w=2070&auto=format&fit=crop" 
                    alt="Shawn MC" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-full h-full border-4 border-teal-600 rounded-3xl z-0 hidden md:block"></div>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={200}>
              <h2 className="text-sm font-bold text-teal-600 tracking-widest uppercase mb-2">Meet Your Host</h2>
              <h3 className="text-4xl md:text-5xl font-black text-stone-900 mb-6 leading-tight">Hosting chose me. <br/> I've been riding the wave ever since.</h3>
              <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                Shawn is a seasoned emcee with over a decade of experience under his belt. With a warm smile and quick wit, he has brought joy and laughter to countless events, seamlessly transitioning between weddings, birthdays, corporate gatherings, and anniversaries.
              </p>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                Recently making Canada his new home, Shawn is no stranger to the stage. Whether he's keeping the party started or ensuring a ceremony runs with absolute precision, his passion for hosting shines through, leaving a lasting impression on all who attend.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8 border-t border-stone-200 pt-8">
                <div>
                  <h4 className="text-4xl font-black text-stone-900 mb-1">10<span className="text-teal-600">+</span></h4>
                  <p className="text-stone-500 font-medium">Years Experience</p>
                </div>
                <div>
                  <h4 className="text-4xl font-black text-stone-900 mb-1">100s</h4>
                  <p className="text-stone-500 font-medium">of Happy Clients</p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-teal-400 tracking-widest uppercase mb-2">Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-6">Tailored for your occasion.</h3>
            <p className="text-stone-400 text-lg">Every event has a different heartbeat. I bring the perfect balance of energy, structure, and humor to match your crowd.</p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeInSection delay={0}>
              <div className="bg-stone-800 h-full p-10 rounded-3xl border border-stone-700 hover:border-teal-500 transition-colors group">
                <div className="w-16 h-16 bg-teal-500/10 text-teal-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Music size={32} />
                </div>
                <h4 className="text-2xl font-bold mb-4">Weddings & Anniversaries</h4>
                <p className="text-stone-400 mb-6 leading-relaxed">
                  Your special day deserves a seamless flow. I ensure your guests are informed, entertained, and ready to celebrate your love story.
                </p>
                <ul className="space-y-3 text-stone-300">
                  <li className="flex items-center gap-2"><ChevronRight size={16} className="text-teal-500"/> Grand Entrances</li>
                  <li className="flex items-center gap-2"><ChevronRight size={16} className="text-teal-500"/> Timeline Management</li>
                  <li className="flex items-center gap-2"><ChevronRight size={16} className="text-teal-500"/> Engaging the Crowd</li>
                </ul>
              </div>
            </FadeInSection>

            <FadeInSection delay={150}>
              <div className="bg-stone-800 h-full p-10 rounded-3xl border border-stone-700 hover:border-teal-500 transition-colors group">
                <div className="w-16 h-16 bg-teal-500/10 text-teal-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users size={32} />
                </div>
                <h4 className="text-2xl font-bold mb-4">Corporate Gatherings</h4>
                <p className="text-stone-400 mb-6 leading-relaxed">
                  Galas, award ceremonies, and holiday parties. Keep your schedule tight and your audience engaged with professional, polished hosting.
                </p>
                <ul className="space-y-3 text-stone-300">
                  <li className="flex items-center gap-2"><ChevronRight size={16} className="text-teal-500"/> Seamless Transitions</li>
                  <li className="flex items-center gap-2"><ChevronRight size={16} className="text-teal-500"/> Speaker Introductions</li>
                  <li className="flex items-center gap-2"><ChevronRight size={16} className="text-teal-500"/> Professional Polish</li>
                </ul>
              </div>
            </FadeInSection>

            <FadeInSection delay={300}>
              <div className="bg-stone-800 h-full p-10 rounded-3xl border border-stone-700 hover:border-teal-500 transition-colors group">
                <div className="w-16 h-16 bg-teal-500/10 text-teal-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Mic size={32} />
                </div>
                <h4 className="text-2xl font-bold mb-4">Birthdays & Private Parties</h4>
                <p className="text-stone-400 mb-6 leading-relaxed">
                  Milestone birthdays and VIP events. I bring infectious energy and a quick wit to make the guest of honor feel like a superstar.
                </p>
                <ul className="space-y-3 text-stone-300">
                  <li className="flex items-center gap-2"><ChevronRight size={16} className="text-teal-500"/> High-Energy Hosting</li>
                  <li className="flex items-center gap-2"><ChevronRight size={16} className="text-teal-500"/> Quick-Witted Humor</li>
                  <li className="flex items-center gap-2"><ChevronRight size={16} className="text-teal-500"/> Unforgettable Memories</li>
                </ul>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section id="media" className="py-24 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-sm font-bold text-teal-600 tracking-widest uppercase mb-2">See It To Believe It</h2>
              <h3 className="text-4xl md:text-5xl font-black text-stone-900">Shawn in Action.</h3>
            </div>
            <div className="mt-4 md:mt-0 flex gap-4">
              <a href="#" className="flex items-center gap-2 font-bold text-stone-900 hover:text-teal-600 transition-colors">
                <Instagram size={20} /> View Instagram
              </a>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <FadeInSection delay={100} className="lg:col-span-2 flex flex-col">
              <div className="relative aspect-video bg-stone-900 rounded-3xl overflow-hidden shadow-2xl mb-4 group cursor-pointer w-full">
                <img 
                  src={activeVideo.thumbnail} 
                  alt={activeVideo.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center pl-2 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(13,148,136,0.5)]">
                    <PlayCircle size={40} className="text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-stone-700/50">
                  <div className="h-full bg-teal-500 w-1/3 transition-all duration-1000 ease-linear"></div>
                </div>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-stone-900">{activeVideo.title}</h4>
                <p className="text-stone-500 font-medium flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Playing Now • {activeVideo.duration}
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={200} className="flex flex-col gap-4">
              <h4 className="font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                <PlayCircle size={20} className="text-teal-600" />
                Video Playlist
              </h4>
              <div className="flex flex-col gap-3 overflow-y-auto pr-2 pb-4 h-full max-h-[400px] lg:max-h-[500px]">
                {videoPlaylist.map((video) => (
                  <div 
                    key={video.id} 
                    onClick={() => setActiveVideo(video)}
                    className={`flex gap-4 p-3 rounded-2xl cursor-pointer transition-all ${activeVideo.id === video.id ? 'bg-white shadow-md border border-stone-200 scale-[1.02]' : 'hover:bg-stone-200 border border-transparent'}`}
                  >
                    <div className="relative w-32 h-20 flex-shrink-0 bg-stone-800 rounded-xl overflow-hidden">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80" />
                      <div className="absolute inset-0 flex items-center justify-center bg-stone-900/20">
                        {activeVideo.id === video.id ? (
                          <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          </div>
                        ) : (
                          <PlayCircle size={24} className="text-white opacity-80" />
                        )}
                      </div>
                      <span className="absolute bottom-1 right-1 bg-stone-900/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {video.duration}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h5 className={`text-sm font-bold line-clamp-2 ${activeVideo.id === video.id ? 'text-teal-600' : 'text-stone-800'}`}>
                        {video.title}
                      </h5>
                      <p className="text-xs text-stone-500 mt-1">Live Event</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-teal-600 tracking-widest uppercase mb-2">Event Highlights</h2>
            <h3 className="text-4xl md:text-5xl font-black text-stone-900 mb-6">A picture is worth a thousand cheers.</h3>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[250px]">
            {galleryImages.map((image, index) => (
              <FadeInSection 
                key={image.id} 
                delay={index * 100} 
                className={`${image.span} relative group overflow-hidden rounded-2xl cursor-pointer bg-stone-100 shadow-sm hover:shadow-xl transition-all duration-300`}
              >
                <div onClick={() => setLightboxImage(image.src)} className="w-full h-full">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-teal-600 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <ImageIcon size={24} />
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
          
          <FadeInSection delay={400} className="mt-12 text-center">
             <button className="text-stone-600 font-bold hover:text-teal-600 transition-colors inline-flex items-center gap-2">
                View Full Gallery on Instagram <Instagram size={18} />
             </button>
          </FadeInSection>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-stone-800 rounded-l-[100px] opacity-20 -z-10 transform translate-x-1/4"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-sm font-bold text-teal-400 tracking-widest uppercase mb-2">Reviews</h2>
            <h3 className="text-4xl md:text-5xl font-black">Words from happy clients.</h3>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "Shawn was the absolute highlight of our wedding. His warm smile put everyone at ease, and his quick wit had the whole room laughing. Everything ran perfectly!",
                author: "Sarah & David",
                event: "Wedding Couple"
              },
              {
                text: "We brought Shawn in for our annual corporate gathering. He managed the crowd brilliantly, keeping things professional but incredibly fun. A true natural.",
                author: "James L.",
                event: "Corporate Event Director"
              },
              {
                text: "If you want someone who can read a room and keep the party alive, Shawn is your guy. He hosted my parents' 50th anniversary and made it entirely unforgettable.",
                author: "Michael T.",
                event: "Anniversary Celebration"
              }
            ].map((review, idx) => (
              <FadeInSection key={idx} delay={idx * 150} className="h-full">
                <div className="bg-stone-800/80 backdrop-blur-sm p-10 rounded-3xl relative h-full flex flex-col justify-between border border-stone-700/50 hover:border-teal-500/30 transition-colors">
                  <div>
                    <div className="flex text-teal-400 mb-6">
                      <Star fill="currentColor" size={20} />
                      <Star fill="currentColor" size={20} />
                      <Star fill="currentColor" size={20} />
                      <Star fill="currentColor" size={20} />
                      <Star fill="currentColor" size={20} />
                    </div>
                    <p className="text-stone-300 italic mb-8 leading-relaxed text-lg">"{review.text}"</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-lg">{review.author}</h5>
                    <p className="text-teal-400 text-sm">{review.event}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-stone-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Contact Info */}
              <div>
                <h2 className="text-sm font-bold text-teal-600 tracking-widest uppercase mb-2">Let's Talk</h2>
                <h3 className="text-4xl md:text-5xl font-black text-stone-900 mb-6">Ready to make your event unforgettable?</h3>
                <p className="text-stone-600 text-lg mb-10 leading-relaxed">
                  Fill out the form with your event details, and I will get back to you to discuss availability, vision, and pricing. Let's create something amazing together.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-stone-500 font-medium">Email Me</p>
                      <a href="mailto:hello@shawnemcee.com" className="text-xl font-bold text-stone-900 group-hover:text-teal-600 transition-colors">hello@shawnemcee.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-stone-500 font-medium">Call Me</p>
                      <a href="tel:+1234567890" className="text-xl font-bold text-stone-900 group-hover:text-teal-600 transition-colors">(555) 123-4567</a>
                    </div>
                  </div>
                </div>

                <div className="mt-12 border-t border-stone-100 pt-8">
                  <p className="text-sm font-bold text-stone-900 uppercase mb-4 tracking-widest">Follow The Journey</p>
                  <div className="flex gap-4">
                    <a href="#" className="w-12 h-12 bg-stone-100 text-stone-600 rounded-full flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors"><Instagram size={20}/></a>
                    <a href="#" className="w-12 h-12 bg-stone-100 text-stone-600 rounded-full flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors"><Facebook size={20}/></a>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">First Name</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">Last Name</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all" placeholder="john@example.com" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">Event Date</label>
                      <input type="date" className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all text-stone-600" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">Event Type</label>
                      <select className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all text-stone-600">
                        <option>Wedding</option>
                        <option>Corporate Gathering</option>
                        <option>Birthday / Anniversary</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Tell me about your event</label>
                    <textarea rows="4" className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all resize-none" placeholder="Location, estimated guest count, specific needs..."></textarea>
                  </div>

                  <button type="submit" className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg flex justify-center items-center gap-2">
                    Send Inquiry <ChevronRight size={20} />
                  </button>
                </form>
              </div>

            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 py-12 text-center text-stone-500">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-black tracking-tighter text-white mb-6">
            SHAWN<span className="text-teal-500">.</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {navItems.map(item => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="hover:text-teal-400 transition-colors uppercase text-sm tracking-wider">{item}</button>
            ))}
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Hosted By Shawn. All rights reserved. 
          </p>
        </div>
      </footer>
    </div>
  );
}