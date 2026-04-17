import { motion } from "motion/react";
import { Stethoscope, Microscope, Syringe, ClipboardPlus, Baby, HeartPulse, Activity, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Services() {
  const services = [
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: "General Consultation",
      desc: "Comprehensive health checkups and diagnosis for all common illnesses.",
      features: ["Physical Exams", "Prescriptions", "Referrals"],
      color: "bg-blue-50"
    },
    {
      icon: <Microscope className="h-8 w-8" />,
      title: "Diagnostics & Imaging",
      desc: "Precision testing with modern equipment for accurate health assessment.",
      features: ["Blood Tests", "X-Rays", "Ultra-Sound"],
      color: "bg-teal-50"
    },
    {
      icon: <Syringe className="h-8 w-8" />,
      title: "Vaccinations",
      desc: "Immunization services for infants, children, and international travelers.",
      features: ["Infectious Disease", "Travel Meds", "Childhood Immunization"],
      color: "bg-indigo-50"
    },
    {
      icon: <ClipboardPlus className="h-8 w-8" />,
      title: "Minor Procedures",
      desc: "Safe and quick surgical procedures that don't require overnight hospitalization.",
      features: ["Wound Care", "Stitches", "Cyst Removal"],
      color: "bg-slate-50"
    },
    {
      icon: <Baby className="h-8 w-8" />,
      title: "Pediatrics",
      desc: "Specialized care for growth, development and health of infants and children.",
      features: ["Growth Tracking", "Nutrition", "Child Mental Health"],
      color: "bg-orange-50"
    },
    {
      icon: <HeartPulse className="h-8 w-8" />,
      title: "Family Planning",
      desc: "Comprehensive counseling and services for healthy family management.",
      features: ["Counseling", "Contraception", "Maternal Health"],
      color: "bg-pink-50"
    }
  ];

  return (
    <div className="bg-white min-h-screen py-24 pt-[150px]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          <div>
            <div className="clean-badge mb-4">Medical Expertise</div>
            <h1 className="text-[56px] font-black text-[#0D1B2A] tracking-tighter leading-[1.1]">
              Precision Health <br /> Solutions
            </h1>
          </div>
          <p className="text-[#5E6D7E] text-[18px] leading-relaxed max-w-lg mb-2">
            Professional diagnostic and therapeutic services delivered with industrial precision. We combine state-of-the-art laboratory systems with specialized expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-slate-50 border border-slate-100 p-10 rounded-[24px] hover:border-medical-blue transition-all group"
            >
              <div className="w-14 h-14 bg-white border border-slate-100 rounded-[16px] flex items-center justify-center text-medical-blue mb-8 group-hover:bg-medical-blue group-hover:text-white transition-all shadow-sm">
                {s.icon}
              </div>
              <h3 className="text-[22px] font-black text-[#0D1B2A] mb-4">{s.title}</h3>
              <p className="text-[#7A8B9D] text-sm mb-8 leading-relaxed line-clamp-2">{s.desc}</p>
              
              <div className="space-y-3 mb-10 pb-6 border-b border-white">
                {s.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-2.5">
                    <div className="w-1 h-1 bg-medical-blue rounded-full"></div>
                    <span className="text-[11px] font-bold text-[#555] uppercase tracking-wider">{f}</span>
                  </div>
                ))}
              </div>

              <Link to="/book" className="text-[12px] font-black text-medical-blue uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                Inquire Service <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Info Card */}
        <div className="mt-24 clean-card bg-medical-blue p-12 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative border-none">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-[32px] md:text-[40px] font-black mb-6 tracking-tighter leading-tight italic">“Medical excellence through systematic care.”</h2>
            <p className="text-blue-100 text-lg font-medium">Partner with Oyah Hospital for comprehensive corporate health management across Lagos.</p>
          </div>
          <div className="relative z-10">
            <Link to="/contact" className="px-10 py-5 bg-white text-medical-blue font-black rounded-[12px] shadow-[0_12px_24px_rgba(0,0,0,0.1)] hover:scale-105 transition-all uppercase text-sm tracking-widest">
               Contact Partner Program
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
