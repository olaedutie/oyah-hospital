import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./lib/AuthContext";
import { LogIn, User as UserIcon, Calendar, Menu, X, Phone, MapPin, Heart, Clock } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { signInWithGoogle, logOut } from "./lib/firebase";

// Components
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Services from "./pages/Services";
import BookAppointment from "./pages/BookAppointment";
import AdminDashboard from "./pages/AdminDashboard";

function Navbar() {
  const { user, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-medical-teal h-[90px] flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-1.5 group">
              <span className="text-2xl font-black text-medical-blue tracking-tighter">
                OYAH HOSPITAL
              </span>
              <div className="w-2 h-2 bg-medical-blue rounded-full mt-1" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <Link to="/services" className="text-sm font-semibold text-[#555] hover:text-medical-blue transition-colors">Services</Link>
            <Link to="/doctors" className="text-sm font-semibold text-[#555] hover:text-medical-blue transition-colors">Specialists</Link>
            <Link to="/book" className="px-6 py-3 bg-medical-blue text-white text-sm font-bold rounded-[10px] hover:shadow-[0_4_12_rgba(42,127,255,0.2)] hover:translate-y-[-2px] transition-all">Book Now</Link>
            
            {user ? (
              <div className="flex items-center gap-6 border-l border-medical-teal pl-6 ml-2">
                {isAdmin && (
                  <Link to="/admin" className="text-sm font-bold text-medical-blue">Dashboard</Link>
                )}
                <button onClick={logOut} className="text-sm font-medium text-[#7A8B9D] hover:text-red-500 transition-colors">Logout</button>
              </div>
            ) : (
              <button onClick={signInWithGoogle} className="text-sm font-bold text-medical-blue bg-medical-teal px-5 py-2.5 rounded-[10px] hover:brightness-95 transition-all">
                Member Portal
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-medical-blue transition-colors">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              <Link to="/services" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Services</Link>
              <Link to="/doctors" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Doctors</Link>
              <Link to="/book" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-center bg-medical-blue text-white font-bold rounded-lg mt-4">Book Appointment</Link>
              {user && isAdmin && (
                <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-2 font-semibold text-medical-blue border-t mt-4">Dashboard</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="h-6 w-6 text-medical-blue" />
              <span className="text-xl font-display font-bold text-white tracking-tight">OYAH HOSPITAL</span>
            </div>
            <p className="max-w-sm text-slate-400 mb-8 leading-relaxed">
              Providing professional and compassionate healthcare for you and your family. Our mission is to ensure quality medical services are accessible and reliable.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-medical-blue" />
                <span className="text-sm">+234 (0) 123 4567</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/services" className="hover:text-medical-blue transition-colors">Our Services</Link></li>
              <li><Link to="/doctors" className="hover:text-medical-blue transition-colors">Our Doctors</Link></li>
              <li><Link to="/book" className="hover:text-medical-blue transition-colors">Book Online</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Working Hours</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between"><span>Mon - Sat</span> <span>08:00 - 20:00</span></li>
              <li className="flex justify-between"><span>Sunday</span> <span>10:00 - 16:00</span></li>
              <li className="flex items-center gap-2 pt-2 text-medical-blue font-semibold">
                <Clock className="h-4 w-4" /> 24/7 Emergency
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 Oyah Hospital. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/services" element={<Services />} />
              <Route path="/book" element={<BookAppointment />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
