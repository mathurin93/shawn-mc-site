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

// Drop-in SVG Fallback for Facebook
const Facebook = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

// Drop-in SVG Fallback for Instagram
const Instagram = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

// Drop-in SVG Fallback for TikTok
const TikTok = ({ size = 20, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);

// Local Image Imports (Commented out for live preview)
import logoImg from './assets/MGW-logo.png';
import bannerImg from './assets/banner-img.jpg';
import aboutImg from './assets/shawn-about-img.jpg';
import heroImg from './assets/hero.png';
import img1Landscape from './assets/img-1-landscape.jpg';
import img3 from './assets/img-3.jpg'; 
import img4 from './assets/img-4.jpg';
import img5 from './assets/img-5.jpg';
import img6Landscape from './assets/img-6-lanscape.jpg';
import img7Landscape from './assets/img-7-landscape.jpg';
import img8 from './assets/img-8.jpg';
import img9 from './assets/img-9.jpg';
import img10Landscape from './assets/img-10-landscape.jpg';
import img11 from './assets/img-11.jpg';
import tdp7653 from './assets/TDP_7653.jpg';

// Local Video Imports (Commented out for live preview)
import vid1 from './assets/vid-1.mp4';
import vid2 from './assets/vid-2.mp4';
import vid3 from './assets/vid-3.mp4';

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
            // Stop observing once it's visible so it doesn't animate out and in repeatedly
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 } // Triggers when 15% of the element is visible
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
  const [formStatus, setFormStatus] = useState(null); // Added form status state

  // Updated Video Playlist using real .mp4 files
  const videoPlaylist = [
    { id: 1, title: "Main Showreel 2024", src: vid1, duration: "2:45" },
    { id: 2, title: "Wedding Grand Entrance", src: vid2, duration: "1:20" },
    { id: 3, title: "Corporate Gala Hosting", src: vid3, duration: "3:10" }
  ];
  const [activeVideo, setActiveVideo] = useState(videoPlaylist[0]);

  // Updated Gallery Logic
  const galleryImages = [
    { id: 1, src: img1Landscape, alt: "Event Landscape 1", span: "col-span-1 md:col-span-2 md:row-span-2", objectPos: "object-center" },
    { id: 2, src: img3, alt: "Event Moment 3", span: "col-span-1 md:col-span-2 md:row-span-2", objectPos: "object-center" }, 
    { id: 3, src: img4, alt: "Event Moment 4", span: "col-span-1 md:col-span-1 md:row-span-2", objectPos: "object-top" }, 
    { id: 4, src: img6Landscape, alt: "Event Landscape 2", span: "col-span-1 md:col-span-2 md:row-span-1", objectPos: "object-center" },
    { id: 5, src: img5, alt: "Master G Wallace on Stage", span: "col-span-1 md:col-span-1 md:row-span-2", objectPos: "object-top" },
    { id: 6, src: img7Landscape, alt: "Event Landscape 3", span: "col-span-1 md:col-span-2 md:row-span-2", objectPos: "object-center" }, 
    { id: 7, src: img8, alt: "Crowd moment", span: "col-span-1 md:col-span-1 md:row-span-2", objectPos: "object-center" }, 
    { id: 8, src: img10Landscape, alt: "Event Landscape 4", span: "col-span-1 md:col-span-2 md:row-span-2", objectPos: "object-center" }, 
    { id: 9, src: img9, alt: "Event moment 9", span: "col-span-1 md:col-span-1 md:row-span-1", objectPos: "object-center" },
    { id: 10, src: img11, alt: "Crowd interaction", span: "col-span-1 md:col-span-1 md:row-span-2", objectPos: "object-center" }, 
    { id: 11, src: tdp7653, alt: "Special Event", span: "col-span-1 md:col-span-1 md:row-span-1", objectPos: "object-center" },
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

  const navItems = ['Home', 'About', 'Services', 'Gallery', 'Testimonials']; 

  // Netlify AJAX Form Submission Handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    const form = e.target;
    const formData = new FormData(form);
    
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => setFormStatus('success'))
    .catch((error) => setFormStatus('error'));
  };

  return (
    <div className="font-sans text-stone-900 bg-stone-50 min-h-screen selection:bg-amber-600 selection:text-white">
      
      {/* Lightbox Overlay */}
      {lightboxImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/95 backdrop-blur-md animate-fade-in" onClick={() => setLightboxImage(null)}>
          <button 
            className="absolute top-6 right-6 text-white hover:text-amber-400 transition-colors bg-stone-800/50 rounded-full p-2"
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
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-stone-900/95 backdrop-blur-md py-3 shadow-xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo Injection - Fixed width/height for perfect circle */}
            <div className="flex-shrink-0 cursor-pointer bg-white/95 p-1.5 rounded-full backdrop-blur-sm shadow-sm transition-transform hover:scale-105 flex items-center justify-center" onClick={() => scrollToSection('home')}>
              <img src={logoImg} alt="Master G Wallace Logo" className="h-12 w-12 md:h-16 md:w-16 object-contain rounded-full" />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8 items-center">
              {navItems.map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-bold uppercase tracking-wider hover:text-amber-400 transition-colors ${isScrolled ? 'text-stone-300' : 'text-white/90'}`}
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105"
              >
                Book Now
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={isScrolled ? 'text-white' : 'text-white'}
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
                  className="block w-full text-left px-3 py-4 text-white text-lg font-medium border-b border-stone-800 hover:text-amber-400"
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
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 cursor-pointer" onClick={() => setLightboxImage(bannerImg)}>
          <img 
            src={bannerImg} 
            alt="Master G Wallace Event Banner" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-900/80 to-stone-900/50"></div>
        </div>

        <FadeInSection className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <span className="block text-amber-500 font-bold tracking-widest uppercase mb-4">
            Seasoned Emcee & Event Host
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight drop-shadow-lg">
            JOY, LAUGHTER & <br className="hidden md:block"/> FLAWLESS EVENTS.
          </h1>
          <p className="text-xl md:text-2xl text-stone-200 mb-10 max-w-2xl mx-auto font-light">
            With a warm smile and quick wit, Master G Wallace brings your celebrations to life—from the first welcome to the final farewell.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto bg-amber-600 hover:bg-amber-500 text-stone-950 px-8 py-4 rounded-full font-black text-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(217,119,6,0.4)] flex items-center justify-center gap-2"
            >
              Check Availability <Calendar size={20} />
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2"
            >
              View Gallery <ImageIcon size={20} />
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
                {/* Image Placeholder */}
                <div 
                  className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10 group cursor-pointer" 
                  onClick={() => setLightboxImage(aboutImg)}
                >
                  <img 
                    src={aboutImg} 
                    alt="Master G Wallace MC" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Hover Overlay for Expand */}
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-amber-600 text-stone-900 p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <ImageIcon size={24} />
                    </div>
                  </div>
                </div>
                {/* Decorative block */}
                <div className="absolute -bottom-6 -left-6 w-full h-full border-4 border-amber-600 rounded-3xl z-0 hidden md:block"></div>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={200}>
              <h2 className="text-sm font-bold text-amber-600 tracking-widest uppercase mb-2">Meet Your Host</h2>
              <h3 className="text-4xl md:text-5xl font-black text-stone-900 mb-6 leading-tight">Hosting chose me. <br/> I've been riding the wave ever since.</h3>
              <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                Master G Wallace has been MC'ing since 2017, bringing joy and laughter to over 200 events. From seamless weddings and corporate events to high-energy birthday parties and anniversary celebrations, he seamlessly transitions to match the heartbeat of any room.
              </p>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                Recently making Canada his new home, Master G Wallace is no stranger to the stage. Whether he's keeping the party started or ensuring a ceremony runs with absolute precision, his passion for hosting shines through, leaving a lasting impression on all who attend.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8 border-t border-stone-200 pt-8">
                <div>
                  <h4 className="text-4xl font-black text-stone-900 mb-1">2017</h4>
                  <p className="text-stone-500 font-medium">Started Hosting</p>
                </div>
                <div>
                  <h4 className="text-4xl font-black text-stone-900 mb-1">200<span className="text-amber-600">+</span></h4>
                  <p className="text-stone-500 font-medium">Events Hosted</p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-stone-950 text-white border-y border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-amber-500 tracking-widest uppercase mb-2">Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-6">Tailored for your occasion.</h3>
            <p className="text-stone-400 text-lg">Every event has a different heartbeat. I bring the perfect balance of energy, structure, and humor to match your crowd.</p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeInSection delay={0}>
              <div className="bg-stone-900 h-full p-10 rounded-3xl border border-stone-800 hover:border-amber-500 transition-colors group shadow-xl">
                <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Music size={32} />
                </div>
                <h4 className="text-2xl font-bold mb-4">Weddings & Anniversaries</h4>
                <p className="text-stone-400 mb-6 leading-relaxed">
                  Your special day deserves a seamless flow. I ensure your guests are informed, entertained, and ready to celebrate your love story.
                </p>
                <ul className="space-y-3 text-stone-300">
                  <li className="flex items-center gap-2"><ChevronRight size={16} className="text-amber-500"/> Grand Entrances</li>
                  <li className="flex items-center gap-2"><ChevronRight size={16} className="text-amber-500"/> Timeline Management</li>
                  <li className="flex items-center gap-2"><ChevronRight size={16} className="text-amber-500"/> Engaging the Crowd</li>
                </ul>
              </div>
            </FadeInSection>

            <FadeInSection delay={150}>
              <div className="bg-stone-900 h-full p-10 rounded-3xl border border-stone-800 hover:border-amber-500 transition-colors group shadow-xl">
                <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users size={32} />
                </div>
                <h4 className="text-2xl font-bold mb-4">Corporate Gatherings</h4>
                <p className="text-stone-400 mb-6 leading-relaxed">
                  Galas, award ceremonies, and holiday parties. Keep your schedule tight and your audience engaged with professional, polished hosting.
                </p>
                <ul className="space-y-3 text-stone-300">
                  <li className="flex items-center gap-2"><ChevronRight size={16} className="text-amber-500"/> Seamless Transitions</li>
                  <li className="flex items-center gap-2"><ChevronRight size={16} className="text-amber-500"/> Speaker Introductions</li>
                  <li className="flex items-center gap-2"><ChevronRight size={16} className="text-amber-500"/> Professional Polish</li>
                </ul>
              </div>
            </FadeInSection>

            <FadeInSection delay={300}>
              <div className="bg-stone-900 h-full p-10 rounded-3xl border border-stone-800 hover:border-amber-500 transition-colors group shadow-xl">
                <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Mic size={32} />
                </div>
                <h4 className="text-2xl font-bold mb-4">Birthdays & Private Parties</h4>
                <p className="text-stone-400 mb-6 leading-relaxed">
                  Milestone birthdays and VIP events. I bring infectious energy and a quick wit to make the guest of honor feel like a superstar.
                </p>
                <ul className="space-y-3 text-stone-300">
                  <li className="flex items-center gap-2"><ChevronRight size={16} className="text-amber-500"/> High-Energy Hosting</li>
                  <li className="flex items-center gap-2"><ChevronRight size={16} className="text-amber-500"/> Quick-Witted Humor</li>
                  <li className="flex items-center gap-2"><ChevronRight size={16} className="text-amber-500"/> Unforgettable Memories</li>
                </ul>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="gallery" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-amber-600 tracking-widest uppercase mb-2">Event Highlights</h2>
            <h3 className="text-4xl md:text-5xl font-black text-stone-900 mb-6">A picture is worth a thousand cheers.</h3>
          </FadeInSection>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[250px] grid-flow-row-dense">
            {galleryImages.map((image, index) => (
              <FadeInSection 
                key={image.id} 
                delay={index * 100} 
                className={`${image.span} relative group overflow-hidden rounded-2xl cursor-pointer bg-stone-200 shadow-sm hover:shadow-xl transition-all duration-300`}
              >
                <div onClick={() => setLightboxImage(image.src)} className="w-full h-full">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className={`w-full h-full object-cover ${image.objectPos || 'object-center'} transition-transform duration-700 group-hover:scale-110`}
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/50 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-amber-600 text-stone-900 p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <ImageIcon size={24} />
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
          
          <FadeInSection delay={400} className="mt-12 text-center">
             <a href="https://www.instagram.com/mastergwallace/" target="_blank" rel="noreferrer" className="text-stone-600 font-bold hover:text-amber-600 transition-colors inline-flex items-center gap-2">
                View Full Gallery on Instagram <Instagram size={18} />
             </a>
          </FadeInSection>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-stone-900 text-white relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-stone-800 rounded-l-[100px] opacity-20 -z-10 transform translate-x-1/4"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-sm font-bold text-amber-500 tracking-widest uppercase mb-2">Reviews</h2>
            <h3 className="text-4xl md:text-5xl font-black">Words from happy clients.</h3>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "Master G Wallace was the absolute highlight of our wedding. His warm smile put everyone at ease, and his quick wit had the whole room laughing. Everything ran perfectly!",
                author: "Sarah & David",
                event: "Wedding Couple"
              },
              {
                text: "We brought Master G in for our annual corporate gathering. He managed the crowd brilliantly, keeping things professional but incredibly fun. A true natural.",
                author: "James L.",
                event: "Corporate Event Director"
              },
              {
                text: "If you want someone who can read a room and keep the party alive, Master G Wallace is your guy. He hosted my parents' 50th anniversary and made it entirely unforgettable.",
                author: "Michael T.",
                event: "Anniversary Celebration"
              }
            ].map((review, idx) => (
              <FadeInSection key={idx} delay={idx * 150} className="h-full">
                <div className="bg-stone-800/80 backdrop-blur-sm p-10 rounded-3xl relative h-full flex flex-col justify-between border border-stone-700/50 hover:border-amber-500/50 transition-colors">
                  <div>
                    <div className="flex text-amber-500 mb-6">
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
                    <p className="text-amber-500 text-sm">{review.event}</p>
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
                <h2 className="text-sm font-bold text-amber-600 tracking-widest uppercase mb-2">Let's Talk</h2>
                <h3 className="text-4xl md:text-5xl font-black text-stone-900 mb-6">Ready to make your event unforgettable?</h3>
                <p className="text-stone-600 text-lg mb-10 leading-relaxed">
                  Fill out the form with your event details, and I will get back to you to discuss availability, vision, and pricing. Let's create something amazing together.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center group-hover:bg-amber-600 group-hover:text-stone-950 transition-colors">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-stone-500 font-medium">Email Me</p>
                      <a href="mailto:mastergwallace@yahoo.com" className="text-xl font-bold text-stone-900 group-hover:text-amber-600 transition-colors">mastergwallace@yahoo.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center group-hover:bg-amber-600 group-hover:text-stone-950 transition-colors">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-stone-500 font-medium">Call Me</p>
                      <a href="tel:+1234567890" className="text-xl font-bold text-stone-900 group-hover:text-amber-600 transition-colors">(555) 123-4567</a>
                    </div>
                  </div>
                </div>

                <div className="mt-12 border-t border-stone-100 pt-8">
                  <p className="text-sm font-bold text-stone-900 uppercase mb-4 tracking-widest">Follow The Journey</p>
                  <div className="flex gap-4">
                    <a href="https://www.instagram.com/mastergwallace/" target="_blank" rel="noreferrer" className="w-12 h-12 bg-stone-100 text-stone-600 rounded-full flex items-center justify-center hover:bg-amber-600 hover:text-stone-950 transition-colors"><Instagram size={20}/></a>
                    <a href="https://www.facebook.com/people/MasterGwallace/100063452296025/#" target="_blank" rel="noreferrer" className="w-12 h-12 bg-stone-100 text-stone-600 rounded-full flex items-center justify-center hover:bg-amber-600 hover:text-stone-950 transition-colors"><Facebook size={20}/></a>
                    <a href="https://www.tiktok.com/@mastergwallace" target="_blank" rel="noreferrer" className="w-12 h-12 bg-stone-100 text-stone-600 rounded-full flex items-center justify-center hover:bg-amber-600 hover:text-stone-950 transition-colors"><TikTok size={20}/></a>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200">
                {formStatus === 'success' ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12 animate-fade-in">
                    <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                      <Star size={40} />
                    </div>
                    <h3 className="text-3xl font-black text-stone-900">Request Sent!</h3>
                    <p className="text-stone-600 text-lg">Thank you! I'll be in touch with you shortly to discuss your event.</p>
                    <button 
                      onClick={() => setFormStatus(null)}
                      className="mt-6 text-amber-600 font-bold hover:text-amber-800 transition-colors"
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form name="contact" method="POST" data-netlify="true" onSubmit={handleFormSubmit} className="space-y-6">
                    {/* Required for Netlify Forms to detect the submission in React */}
                    <input type="hidden" name="form-name" value="contact" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">First Name</label>
                        <input type="text" name="firstName" required className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all" placeholder="John" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">Last Name</label>
                        <input type="text" name="lastName" required className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all" placeholder="Doe" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">Email Address</label>
                      <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all" placeholder="john@example.com" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">Event Date</label>
                        <input type="date" name="eventDate" className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-stone-600" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">Event Type</label>
                        <select name="eventType" className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-stone-600">
                          <option value="Wedding">Wedding</option>
                          <option value="Corporate Gathering">Corporate Gathering</option>
                          <option value="Birthday / Anniversary">Birthday / Anniversary</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">Tell me about your event</label>
                      <textarea name="message" required rows="4" className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none" placeholder="Location, estimated guest count, specific needs..."></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={formStatus === 'submitting'}
                      className={`w-full bg-amber-600 hover:bg-amber-500 text-stone-950 font-black py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg flex justify-center items-center gap-2 ${formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {formStatus === 'submitting' ? 'Sending...' : 'Send Inquiry'} <ChevronRight size={20} />
                    </button>
                    {formStatus === 'error' && (
                      <p className="text-red-500 text-sm text-center mt-2 font-medium">Oops! There was a problem submitting your form. Please try again.</p>
                    )}
                  </form>
                )}
              </div>

            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 py-12 text-center text-stone-500">
        <div className="max-w-7xl mx-auto px-4">
          {/* Replaced Text Logo with Image Logo in Footer - Fixed for perfect circle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/95 p-2 rounded-full shadow-lg inline-flex items-center justify-center">
              <img src={logoImg} alt="Master G Wallace Logo" className="h-16 w-16 object-contain rounded-full" />
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {navItems.map(item => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="hover:text-amber-400 transition-colors uppercase text-sm tracking-wider font-medium">{item}</button>
            ))}
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Hosted By Master G Wallace. All rights reserved. 
          </p>
        </div>
      </footer>
    </div>
  );
}