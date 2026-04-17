import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, ArrowLeft, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const appointmentSchema = z.object({
  patientName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone number required"),
  service: z.string().min(1, "Please select a service"),
  doctorId: z.string().min(1, "Please select a doctor"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time slot is required"),
  notes: z.string().optional(),
});

type AppointmentForm = z.infer<typeof appointmentSchema>;

export default function BookAppointment() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [docs, setDocs] = useState<{ id: string; name: string }[]>([]);
  const [servs, setServs] = useState<{ id: string; name: string }[]>([]);

  const { register, handleSubmit, formState: { errors } } = useForm<AppointmentForm>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0]
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      // Mock data if Firestore is empty for first load, or just fetch if setup
      const dSnap = await getDocs(query(collection(db, "doctors")));
      const sSnap = await getDocs(query(collection(db, "services")));
      
      const dList = dSnap.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
      const sList = sSnap.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
      
      // Seed if empty for demo
      if (dList.length === 0) setDocs([{ id: "seed-doc-1", name: "Dr. Adebayo Omotosho" }, { id: "seed-doc-2", name: "Dr. Ngozi Eze" }]);
      else setDocs(dList);

      if (sList.length === 0) setServs([{ id: "s1", name: "General Consultation" }, { id: "s2", name: "Diagnostics" }, { id: "s3", name: "Vaccination" }]);
      else setServs(sList);
    };
    fetchData();
  }, []);

  const onSubmit = async (data: AppointmentForm) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "appointments"), {
        ...data,
        status: "pending",
        createdAt: new Date().toISOString(),
      });
      setIsSuccess(true);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white p-12 rounded-[2rem] shadow-2xl shadow-medical-blue/10 text-center border border-slate-50"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Booking Confirmed!</h2>
          <p className="text-slate-600 mb-10 leading-relaxed">
            Thank you for choosing Oyah Hospital. Our staff will review your request and send a confirmation shortly.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 text-medical-blue font-bold px-6 py-3 bg-medical-teal rounded-xl hover:bg-medical-blue hover:text-white transition-all">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-24 px-4 pt-[150px]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <div className="clean-badge mb-4 mx-auto w-fit">Appointment Portal</div>
          <h1 className="text-[48px] font-black text-[#0D1B2A] tracking-tighter leading-tight">Secure Your Visit</h1>
          <p className="text-[#5E6D7E] mt-4 text-lg">Professional healthcare registration system.</p>
        </div>

        <div className="clean-card overflow-hidden flex flex-col md:flex-row bg-white border-slate-100 shadow-[0_30px_60px_rgba(0,0,0,0.05)]">
          {/* Info Side */}
          <div className="md:w-[320px] bg-slate-50 p-8 md:p-12 border-r border-slate-100 flex flex-col justify-between">
            <div>
              <h3 className="text-[18px] font-black text-[#0D1B2A] mb-8 uppercase tracking-widest">Clinic Access</h3>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-medical-blue" />
                  </div>
                  <p className="text-[13px] font-bold text-[#555] leading-relaxed">123 Healthcare Ave, Victoria Island, Lagos</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-medical-blue" />
                  </div>
                  <p className="text-[13px] font-bold text-[#555] leading-relaxed">+234 (0) 123 4567</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-white border border-slate-100 rounded-[16px]">
               <p className="text-[10px] font-black text-medical-blue uppercase tracking-widest mb-2">Protocol</p>
               <p className="text-[12px] text-[#7A8B9D] leading-relaxed">Arrive 15 mins early for biometrics and registration.</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="flex-1 p-8 md:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-[#7A8B9D] uppercase tracking-widest ml-1">Patient Identity</label>
                  <input {...register("patientName")} className="clean-input" placeholder="Full legal name" />
                  {errors.patientName && <p className="text-[11px] text-red-500 ml-1">{errors.patientName.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-[#7A8B9D] uppercase tracking-widest ml-1">Verification Phone</label>
                  <input {...register("phone")} className="clean-input" placeholder="+234..." />
                  {errors.phone && <p className="text-[11px] text-red-500 ml-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-[#7A8B9D] uppercase tracking-widest ml-1">Email Coordinates</label>
                <input {...register("email")} className="clean-input" placeholder="email@hospital.com" />
                {errors.email && <p className="text-[11px] text-red-500 ml-1">{errors.email.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-[#7A8B9D] uppercase tracking-widest ml-1">Medical Service</label>
                  <select {...register("service")} className="clean-input appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27none%27%20viewBox%3D%270%200%2020%2020%27%3E%3Cpath%20stroke%3D%27%236b7280%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%20stroke-width%3D%271.5%27%20d%3D%27m6%208%204%204%204-4%27%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat">
                    <option value="">Select Service...</option>
                    {servs.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                  </select>
                  {errors.service && <p className="text-[11px] text-red-500 ml-1">{errors.service.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-[#7A8B9D] uppercase tracking-widest ml-1">Assigned Specialist</label>
                  <select {...register("doctorId")} className="clean-input appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27none%27%20viewBox%3D%270%200%2020%2020%27%3E%3Cpath%20stroke%3D%27%236b7280%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%20stroke-width%3D%271.5%27%20d%3D%27m6%208%204%204%204-4%27%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat">
                    <option value="">Choose Specialist...</option>
                    {docs.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                  {errors.doctorId && <p className="text-[11px] text-red-500 ml-1">{errors.doctorId.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-[#7A8B9D] uppercase tracking-widest ml-1">Calendar Date</label>
                  <input type="date" {...register("date")} className="clean-input" />
                  {errors.date && <p className="text-[11px] text-red-500 ml-1">{errors.date.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-[#7A8B9D] uppercase tracking-widest ml-1">Precision Slot</label>
                  <select {...register("time")} className="clean-input appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27none%27%20viewBox%3D%270%200%2020%2020%27%3E%3Cpath%20stroke%3D%27%236b7280%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%20stroke-width%3D%271.5%27%20d%3D%27m6%208%204%204%204-4%27%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat">
                    <option value="">Select Time...</option>
                    {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.time && <p className="text-[11px] text-red-500 ml-1">{errors.time.message}</p>}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-medical-blue text-white font-black py-4 rounded-[12px] shadow-[0_12px_24px_rgba(42,127,255,0.2)] hover:translate-y-[-2px] transition-all disabled:opacity-50 text-[15px]"
              >
                {isSubmitting ? "TRANSMITTING..." : "CONFIRM APPOINTMENT"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
