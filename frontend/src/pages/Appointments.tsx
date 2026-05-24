import { useEffect, useState } from 'react';
import { fetchAppointments, fetchPatients, fetchDoctors, createAppointment } from '../services/api';

export default function Appointments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  useEffect(() => {
    Promise.all([fetchAppointments(), fetchPatients(), fetchDoctors()])
      .then(([appts, pats, docs]) => {
        setAppointments(appts);
        setPatients(pats);
        setDoctors(docs);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleBook = async () => {
    if(!selectedPatient || !selectedDoctor || !appointmentDate || !appointmentTime) {
      alert('Please fill all fields');
      return;
    }
    const dateTime = `${appointmentDate}T${appointmentTime}:00`;
    try {
      await createAppointment({
        patientId: Number(selectedPatient),
        doctorId: Number(selectedDoctor),
        appointmentTime: dateTime,
        reason: 'General Checkup'
      });
      setIsModalOpen(false);
      const updated = await fetchAppointments();
      setAppointments(updated);
    } catch(err) {
      console.error(err);
      alert('Failed to book appointment');
    }
  };

  const filteredAppointments = appointments.filter(appt => {
    return (appt.patient.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
           (appt.doctor.name?.toLowerCase() || '').includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <main className="flex-1 flex flex-col min-h-screen">
        <div className="flex-1 p-4 md:p-8 max-w-[1440px] mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Appointments</h2>
              <p className="font-body-md text-body-md text-slate-muted mt-1">Manage weekly schedules and bookings.</p>
            </div>
            <button 
              className="bg-secondary text-white font-label-md text-label-md px-5 py-2.5 rounded-lg shadow-sm hover:bg-secondary-container transition-colors duration-200 flex items-center gap-2" 
              onClick={() => setIsModalOpen(true)}
            >
              <span className="material-symbols-outlined">add</span>
              Book Appointment
            </button>
          </div>

          {/* Search/Filter Header */}
          <div className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(30,41,59,0.05)] border border-outline-variant/20 p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-slate-muted font-headline-md text-headline-md text-on-surface">
              All Active Appointments
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-muted text-[20px]">search</span>
                <input 
                  className="w-full pl-10 pr-4 py-2 bg-surface-off-white border border-outline-variant/50 rounded-lg font-body-md text-body-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all" 
                  placeholder="Search doctor or patient..." 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(30,41,59,0.05)] border border-outline-variant/20 overflow-hidden mb-6">
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead className="bg-surface-off-white">
                   <tr className="border-b border-outline-variant/20">
                     <th className="py-4 px-6 font-label-sm text-label-sm text-slate-muted uppercase">Date & Time</th>
                     <th className="py-4 px-6 font-label-sm text-label-sm text-slate-muted uppercase">Patient</th>
                     <th className="py-4 px-6 font-label-sm text-label-sm text-slate-muted uppercase">Doctor</th>
                     <th className="py-4 px-6 font-label-sm text-label-sm text-slate-muted uppercase">Status</th>
                     <th className="py-4 px-6 font-label-sm text-label-sm text-slate-muted uppercase text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-outline-variant/10">
                   {loading ? (
                     <tr><td colSpan={5} className="py-4 px-6 text-center text-slate-muted">Loading...</td></tr>
                   ) : filteredAppointments.length === 0 ? (
                     <tr><td colSpan={5} className="py-4 px-6 text-center text-slate-muted">No appointments found.</td></tr>
                   ) : (
                     filteredAppointments.map(appt => (
                       <tr key={appt.id} className="hover:bg-mint-bg transition-colors group">
                         <td className="py-4 px-6 text-on-surface-variant font-medium">
                           {new Date(appt.appointmentTime).toLocaleString()}
                         </td>
                         <td className="py-4 px-6 font-medium text-on-surface">{appt.patient.name}</td>
                         <td className="py-4 px-6 text-slate-muted">{appt.doctor.name}</td>
                         <td className="py-4 px-6">
                           <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm ${appt.status === 'Confirmed' ? 'bg-primary/10 text-primary' : 'bg-warning-orange/10 text-warning-orange'}`}>
                             {appt.status}
                           </span>
                         </td>
                         <td className="py-4 px-6 text-right">
                           <div className="flex justify-end gap-2 transition-opacity">
                              <button 
                                className="p-1.5 text-secondary hover:bg-secondary-fixed rounded-md transition-colors" 
                                title="Edit/Reschedule"
                                onClick={() => alert(`Edit appointment ${appt.id}`)}
                              >
                                <span className="material-symbols-outlined text-xl">edit</span>
                              </button>
                           </div>
                         </td>
                       </tr>
                     ))
                   )}
                 </tbody>
               </table>
             </div>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
          <div className="absolute inset-0 bg-slate-dark/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-xl shadow-[0px_10px_30px_rgba(30,41,59,0.1)] border border-outline-variant/30 w-full max-w-2xl max-h-[921px] overflow-y-auto flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface">New Appointment</h3>
              <button className="text-slate-muted hover:text-on-surface transition-colors p-1 rounded-full hover:bg-surface-container-low" onClick={() => setIsModalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 flex-1 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <label className="font-label-md text-label-md text-on-surface font-semibold">Select Patient</label>
                <select 
                  className="w-full p-3 bg-white border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30"
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                >
                  <option value="">-- Choose Patient --</option>
                  {patients.map(p => <option key={p.id} value={p.id}>{p.name} (ID: {p.id})</option>)}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface font-semibold">Doctor</label>
                  <select 
                    className="w-full p-3 bg-white border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30"
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                  >
                    <option value="">-- Choose Doctor --</option>
                    {doctors.map(d => <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>)}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <label className="font-label-md text-label-md text-on-surface font-semibold">Date &amp; Time</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-muted">calendar_today</span>
                    <input 
                      className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30" 
                      type="date"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-muted">schedule</span>
                    <input 
                      className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30" 
                      type="time"
                      value={appointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-outline-variant/20 bg-surface-off-white flex justify-end gap-3 rounded-b-xl">
              <button className="px-5 py-2.5 rounded-lg font-label-md text-label-md text-slate-muted hover:bg-surface-variant transition-colors" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button 
                className="bg-secondary text-white font-label-md text-label-md px-6 py-2.5 rounded-lg shadow-sm hover:bg-secondary-container transition-colors duration-200"
                onClick={handleBook}
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
