import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ShieldCheck, Award, PhoneCall, ArrowRight, UserCheck, Stethoscope, Microscope, Baby, UserPlus, Users } from "lucide-react";

export default function Home() {
  const features = [
    { icon: <UserCheck className="h-6 w-6" />, title: "Licensed Doctors", desc: "Expert medical teams with years of experience." },
    { icon: <ShieldCheck className="h-6 w-6" />, title: "Certified Facility", desc: "Clean, safe, and state-of-the-art environment." },
    { icon: <PhoneCall className="h-6 w-6" />, title: "Emergency Support", desc: "Available when you need us the most." },
  ];

  const servicesPreview = [
    { icon: <Stethoscope />, name: "General Consultation", desc: "Comprehensive health exams for all ages." },
    { icon: <Microscope />, name: "Diagnostics", desc: "Advanced laboratory and imaging services." },
    { icon: <Users />, name: "Family Care", desc: "Holistic health management for the whole family." },
  ];

  return (
    <div className="overflow-x-hidden pt-[90px]">
      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-grow"
        >
          <div className="inline-block bg-medical-teal text-medical-blue px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wider mb-6">
            Official Healthcare Partner
          </div>
          <h1 className="text-[56px] font-black text-[#0D1B2A] leading-[1.1] mb-6 tracking-[-1.5px]">
            Trusted Care for <br />
            You and Your Family
          </h1>
          <p className="text-[18px] text-[#5E6D7E] mb-10 max-w-[500px] leading-relaxed">
            Professional, compassionate healthcare services you can rely on. State-of-the-art facilities with specialized medical teams.
          </p>
          
          <div className="flex gap-8 mb-12">
            {[
              { icon: "✓", label: "Licensed\nDoctors" },
              { icon: "⚡", label: "Emergency\nSupport" },
              { icon: "🛡️", label: "Certified\nFacility" }
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-lg">
                  {badge.icon}
                </div>
                <p className="text-[13px] font-bold text-[#555] leading-tight whitespace-pre-line">
                  {badge.label}
                </p>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {servicesPreview.map((s, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 p-5 rounded-[16px]">
                <h3 className="text-[15px] font-black text-[#0D1B2A] mb-2">{s.name.split(' ')[0]}</h3>
                <p className="text-[12px] text-[#7A8B9D] leading-tight">{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.aside 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="clean-card p-8 bg-white"
        >
          <h2 className="text-[24px] font-black text-[#0D1B2A] mb-6 tracking-tight">Quick Booking</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-[12px] font-bold text-[#7A8B9D] uppercase tracking-wider mb-2">Patient Name</label>
              <input type="text" className="clean-input" placeholder="e.g. Samuel Ade" />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-[#7A8B9D] uppercase tracking-wider mb-2">Service Required</label>
              <select className="clean-input">
                <option>General Consultation</option>
                <option>Diagnostic Tests</option>
                <option>Vaccination</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[12px] font-bold text-[#7A8B9D] uppercase tracking-wider mb-2">Date</label>
                <input type="text" className="clean-input" placeholder="DD/MM/YY" />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-[#7A8B9D] uppercase tracking-wider mb-2">Time</label>
                <input type="text" className="clean-input" placeholder="09:00 AM" />
              </div>
            </div>
            <Link to="/book" className="block w-full text-center bg-medical-blue text-white py-4 rounded-[12px] font-bold text-[15px] mt-2 shadow-[0_4_12_rgba(42,127,255,0.2)]">
              Confirm Appointment
            </Link>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-100 flex items-center gap-3">
            <div className="w-11 h-11 bg-slate-200 rounded-[12px] overflow-hidden">
               <img src="https://picsum.photos/seed/doc- Sarah/100/100" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-[#0D1B2A]">Dr. Sarah Oladele</p>
              <p className="text-[12px] text-[#7A8B9D]">Chief of Staff • 12 yrs Exp</p>
            </div>
          </div>
        </motion.aside>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-medical-blue font-bold uppercase tracking-widest text-sm">Our Focus</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-2">Specialized Medical Services</h2>
            <div className="h-1.5 w-20 bg-medical-blue mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicesPreview.map((s, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:shadow-slate-100 transition-all group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-medical-blue shadow-lg group-hover:bg-medical-blue group-hover:text-white transition-colors mb-6">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{s.name}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{s.desc}</p>
                <Link to="/services" className="inline-flex items-center gap-2 text-medical-blue font-bold group-hover:translate-x-2 transition-transform">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-medical-blue/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Ready to prioritize your health?</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              Schedule your visit today with our specialist doctors. No long wait times, just quality care guaranteed.
            </p>
            <Link to="/book" className="px-10 py-5 bg-white text-slate-900 font-bold rounded-2xl hover:bg-medical-blue hover:text-white hover:scale-105 active:scale-95 transition-all inline-block shadow-2xl">
              Book Appointment Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
