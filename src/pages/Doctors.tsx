import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { motion } from "motion/react";
import { Award, GraduationCap, Globe, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  experienceYears: number;
  education: string;
  languages: string[];
  photoUrl: string;
}

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      const snap = await getDocs(collection(db, "doctors"));
      const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Doctor));
      
      if (list.length === 0) {
        // Sample data for demo
        const samples = [
          {
            name: "Dr. Adebayo Omotosho",
            specialty: "General Surgeon",
            bio: "Expert in minor procedures and general healthcare with over 15 years of experience in leading hospitals.",
            experienceYears: 15,
            education: "MBBS, Lagos State University",
            languages: ["English", "Yoruba"],
            photoUrl: "https://picsum.photos/seed/doc1/400/500"
          },
          {
            name: "Dr. Sarah Oladele",
            specialty: "Chief of Staff",
            bio: "Expert in hospital management and family care with over 12 years of clinical experience.",
            experienceYears: 12,
            education: "MD, Johns Hopkins University",
            languages: ["English", "French"],
            photoUrl: "https://picsum.photos/seed/doc- Sarah/400/500"
          },
          {
            name: "Dr. Ngozi Eze",
            specialty: "Pediatrician",
            bio: "Dedicated to providing the best care for children and infants with a gentle approach.",
            experienceYears: 10,
            education: "MD, University of Ibadan",
            languages: ["English", "Igbo"],
            photoUrl: "https://picsum.photos/seed/doc2/400/500"
          }
        ];
        // Note: We don't auto-seed to Firestore here to avoid permission issues during first public view, 
        // just show them in state.
        setDoctors(samples.map((s, i) => ({ id: `temp-${i}`, ...s })));
      } else {
        setDoctors(list);
      }
      setLoading(false);
    };
    fetchDoctors();
  }, []);

  return (
    <div className="bg-white min-h-screen py-24 px-4 pt-[150px]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <div className="clean-badge mb-4 mx-auto w-fit">Specialists</div>
          <h1 className="text-[56px] font-black text-[#0D1B2A] tracking-tighter leading-tight">Our Medical Team</h1>
          <p className="text-[#5E6D7E] mt-6 text-lg leading-relaxed">
            Highly qualified specialists dedicated to providing world-class healthcare with precision and compassion.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[500px] bg-slate-50 border border-slate-100 animate-pulse rounded-[24px]"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {doctors.map((doc, i) => (
              <motion.div 
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-[24px] bg-slate-50 border border-slate-100 aspect-[4/5] mb-6">
                  <img 
                    src={doc.photoUrl} 
                    alt={doc.name} 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="px-1">
                  <p className="text-[10px] font-black text-medical-blue uppercase tracking-[2px] mb-2">
                    {doc.specialty}
                  </p>
                  <h3 className="text-[22px] font-black text-[#0D1B2A] mb-2">{doc.name}</h3>
                  <p className="text-[#7A8B9D] text-sm mb-6 leading-relaxed line-clamp-2">{doc.bio}</p>
                  
                  <div className="flex items-center gap-6 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-medical-blue" />
                      <span className="text-[11px] font-bold text-[#555]">{doc.experienceYears}Y EXP</span>
                    </div>
                    <Link to="/book" className="text-[11px] font-black text-medical-blue uppercase tracking-widest ml-auto hover:underline underline-offset-4">
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
