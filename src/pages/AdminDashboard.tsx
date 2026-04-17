import { useEffect, useState } from "react";
import { useAuth } from "../lib/AuthContext";
import { signInWithGoogle } from "../lib/firebase";
import { collection, query, orderBy, getDocs, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { motion, AnimatePresence } from "motion/react";
import { 
  BarChart3, Calendar, Users, Briefcase, FileText, Settings, 
  LogOut, CheckCircle2, XCircle, Clock, Search, MoreVertical,
  ChevronRight, Filter, Download
} from "lucide-react";
import { cn } from "../lib/utils";

interface Appointment {
  id: string;
  patientName: string;
  email: string;
  phone: string;
  service: string;
  doctorId: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("appointments");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isAdmin) return;

    // Real-time listener for appointments
    const q = query(collection(db, "appointments"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
      setAppointments(list);
    });

    return unsubscribe;
  }, [isAdmin]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, "appointments", id), { status });
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading portal...</div>;

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
        <div className="max-w-md w-full bg-white p-12 rounded-[2rem] shadow-2xl text-center">
          <div className="bg-medical-teal p-4 rounded-3xl w-fit mx-auto mb-8">
            <LockIcon className="h-8 w-8 text-medical-blue" />
          </div>
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Staff Portal</h2>
          <p className="text-slate-500 mb-10">Please sign in with your hospital authorized account to access the dashboard.</p>
          <button onClick={signInWithGoogle} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all">
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  const filtered = appointments.filter(a => 
    a.patientName.toLowerCase().includes(search.toLowerCase()) ||
    a.phone.includes(search)
  );

  const stats = [
    { label: "Total Bookings", val: appointments.length, icon: <Calendar />, color: "bg-blue-50 text-blue-600" },
    { label: "Pending", val: appointments.filter(a => a.status === "pending").length, icon: <Clock />, color: "bg-yellow-50 text-yellow-600" },
    { label: "Confirmed", val: appointments.filter(a => a.status === "confirmed").length, icon: <CheckCircle2 />, color: "bg-green-50 text-green-600" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row pt-[90px]">
      {/* Sidebar */}
      <aside className="w-full md:w-[280px] bg-white border-r border-medical-teal p-8 flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-medical-blue p-2 rounded-[8px]">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <span className="font-black text-[#0D1B2A] tracking-tighter">ADMIN PORTAL</span>
        </div>

        <nav className="flex-grow space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-[12px] transition-all font-bold text-[13px] uppercase tracking-wider",
                activeTab === item.id 
                  ? "bg-medical-blue text-white shadow-[0_8px_16px_rgba(42,127,255,0.2)]" 
                  : "text-[#7A8B9D] hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-medical-teal mt-8">
          <div className="flex items-center gap-3 px-4">
            <div className="w-9 h-9 rounded-[10px] bg-medical-teal flex items-center justify-center font-black text-[12px] text-medical-blue border border-medical-blue/10">
              {user.displayName?.[0] || user.email?.[0].toUpperCase()}
            </div>
            <div className="truncate">
              <p className="text-[13px] font-black text-[#0D1B2A] truncate leading-tight">{user.displayName || "Admin"}</p>
              <p className="text-[10px] text-[#7A8B9D] truncate font-bold uppercase tracking-tighter">{user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <h1 className="text-[32px] font-black text-[#0D1B2A] tracking-tighter">Hospital Control</h1>
            <p className="text-[#7A8B9D] text-sm mt-1 font-medium italic">Operational monitoring and resource management</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-[300px]">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A8B9D]" />
               <input 
                 className="clean-input !bg-white pl-12"
                 placeholder="Search identifiers..."
                 value={search}
                 onChange={e => setSearch(e.target.value)}
               />
            </div>
            <button className="p-3.5 bg-white border border-medical-teal rounded-[12px] text-[#7A8B9D] hover:border-medical-blue transition-all shadow-sm">
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {stats.map((s, i) => (
            <div key={i} className="clean-card p-8 flex items-center justify-between border-slate-100">
              <div>
                <p className="text-[11px] font-black text-[#7A8B9D] uppercase tracking-widest mb-1">{s.label}</p>
                <p className="text-[36px] font-black text-[#0D1B2A] tracking-tighter">{s.val}</p>
              </div>
              <div className={cn("p-4 rounded-[16px]", s.color)}>
                {s.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Appointments Table */}
        <section className="clean-card border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white/50 backdrop-blur-sm z-10">
            <h3 className="text-[18px] font-black text-[#0D1B2A] tracking-tight">Active Ledger</h3>
            <button className="text-[10px] font-black text-medical-blue tracking-widest uppercase border border-medical-blue/20 px-3 py-1.5 rounded-full hover:bg-medical-teal transition-all">
              Download Record
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-8 py-4 text-[10px] font-black text-[#7A8B9D] uppercase tracking-widest">Patient Identity</th>
                  <th className="px-8 py-4 text-[10px] font-black text-[#7A8B9D] uppercase tracking-widest">Classification</th>
                  <th className="px-8 py-4 text-[10px] font-black text-[#7A8B9D] uppercase tracking-widest">Registry Schedule</th>
                  <th className="px-8 py-4 text-[10px] font-black text-[#7A8B9D] uppercase tracking-widest">Verification Status</th>
                  <th className="px-8 py-4 text-[10px] font-black text-[#7A8B9D] uppercase tracking-widest text-right">Operation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(a => (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-6">
                      <p className="text-[15px] font-black text-[#0D1B2A]">{a.patientName}</p>
                      <p className="text-[12px] font-bold text-[#7A8B9D] tracking-tighter">{a.phone}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[11px] font-bold text-medical-blue bg-medical-teal px-3 py-1 rounded-full">{a.service}</span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-[13px] font-bold text-[#0D1B2A]">{a.date}</p>
                      <p className="text-[11px] font-bold text-[#7A8B9D] uppercase">{a.time}</p>
                    </td>
                    <td className="px-8 py-6">
                      <StatusBadge status={a.status} />
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex justify-end gap-3">
                         {a.status === "pending" && (
                            <>
                              <button onClick={() => updateStatus(a.id, "confirmed")} className="w-9 h-9 bg-green-50 text-green-600 border border-green-100 flex items-center justify-center rounded-[10px] hover:bg-green-100 transition-all" title="Confirm">
                                <CheckCircle2 className="h-5 w-5" />
                              </button>
                              <button onClick={() => updateStatus(a.id, "cancelled")} className="w-9 h-9 bg-red-50 text-red-600 border border-red-100 flex items-center justify-center rounded-[10px] hover:bg-red-100 transition-all" title="Cancel">
                                <XCircle className="h-5 w-5" />
                              </button>
                            </>
                         )}
                         {a.status === "confirmed" && (
                           <button onClick={() => updateStatus(a.id, "completed")} className="px-4 py-2 bg-[#0D1B2A] text-white text-[11px] font-black rounded-[8px] hover:translate-y-[-1px] transition-all tracking-widest">
                             COMPLETE
                           </button>
                         )}
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: <BarChart3 className="h-4 w-4" /> },
  { id: "appointments", label: "Appointments", icon: <Calendar className="h-4 w-4" /> },
  { id: "doctors", label: "Doctors Management", icon: <Users className="h-4 w-4" /> },
  { id: "services", label: "Clinic Services", icon: <Briefcase className="h-4 w-4" /> },
  { id: "content", label: "Health CMS", icon: <FileText className="h-4 w-4" /> },
];

function StatusBadge({ status }: { status: string }) {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };
  return (
    <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight", styles[status as keyof typeof styles])}>
      {status}
    </span>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}
