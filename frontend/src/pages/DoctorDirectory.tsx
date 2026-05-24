import { useEffect, useState } from 'react';
import { fetchDoctors, fetchDepartments, createDoctor } from '../services/api';

export default function DoctorDirectory() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialization: 'General Practice'
  });

  const loadData = () => {
    setLoading(true);
    Promise.all([fetchDoctors(), fetchDepartments()])
      .then(([doctorsData, deptsData]) => {
        setDoctors(doctorsData);
        setDepartments(deptsData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateDoctor = async () => {
    if(!formData.name || !formData.email || !formData.specialization) {
      alert("Please fill in required fields: Name, Email, Specialization");
      return;
    }
    try {
      await createDoctor(formData);
      setIsModalOpen(false);
      loadData(); // refresh list
    } catch (error) {
      console.error(error);
      alert("Failed to create doctor");
    }
  };

  const filteredDoctors = doctors.filter(doc => {
    return (doc.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
           (doc.specialization?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
           (doc.email?.toLowerCase() || '').includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <main className="flex-1 w-full max-w-[1440px] mx-auto p-4 md:p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-1">Doctors Directory</h1>
            <p className="font-body-md text-body-md text-slate-muted">Manage hospital staff, view specialties, and oversee departments.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-muted">search</span>
              <input 
                className="w-full pl-10 pr-4 py-2 bg-white border border-outline-variant/50 rounded-lg font-body-md text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none shadow-sm transition-shadow" 
                placeholder="Search doctors..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              className="bg-secondary text-white px-4 py-2 rounded-lg font-label-md text-label-md font-semibold hover:bg-secondary-container transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Add Doctor
            </button>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Doctors Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start auto-rows-max">
            {loading ? (
              <div className="col-span-full p-8 text-center text-slate-muted">Loading doctors...</div>
            ) : filteredDoctors.length === 0 ? (
              <div className="col-span-full p-8 text-center text-slate-muted">No doctors found.</div>
            ) : (
              filteredDoctors.map(doctor => (
                <div key={doctor.id} className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(30,41,59,0.05)] border border-outline-variant/10 hover:shadow-[0_10px_30px_rgba(30,41,59,0.1)] transition-shadow group relative overflow-hidden h-full flex flex-col">
                  <div className="absolute top-0 right-0 p-3">
                    <span 
                      className="material-symbols-outlined text-slate-muted hover:text-secondary cursor-pointer text-sm"
                      onClick={() => alert(`Doctor options for ${doctor.name}`)}
                    >more_vert</span>
                  </div>
                  <div className="flex flex-col items-center text-center mb-4 mt-2">
                    <div className="w-20 h-20 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-2xl mb-3 border-2 border-white shadow-sm ring-2 ring-secondary/10 group-hover:ring-secondary/30 transition-all">
                      {doctor.name.substring(0, 2).toUpperCase()}
                    </div>
                    <h3 className="font-label-md text-label-md font-bold text-on-surface">{doctor.name}</h3>
                    <p className="font-label-sm text-label-sm text-slate-muted mb-2">{doctor.specialization}</p>
                    <span className="bg-mint-bg text-primary px-2 py-1 rounded text-[10px] font-semibold uppercase tracking-wider">Active</span>
                  </div>
                  <div className="border-t border-outline-variant/10 pt-4 mt-auto flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-slate-muted font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[16px]">mail</span>
                      <span className="truncate">{doctor.email}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded text-[10px] font-semibold">Available</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Departments Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(30,41,59,0.05)] border border-outline-variant/10 overflow-hidden flex flex-col h-full max-h-[800px]">
              <div className="p-5 border-b border-outline-variant/10 bg-surface-off-white/50 flex justify-between items-center">
                <h2 className="font-label-md text-label-md font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">domain</span>
                  Departments overview
                </h2>
                <span className="material-symbols-outlined text-slate-muted hover:text-secondary cursor-pointer text-sm">filter_list</span>
              </div>
              <div className="p-4 flex-1 overflow-y-auto">
                <ul className="flex flex-col gap-2">
                  {loading ? (
                    <li className="p-3 text-center text-slate-muted text-sm">Loading...</li>
                  ) : departments.length === 0 ? (
                    <li className="p-3 text-center text-slate-muted text-sm">No departments found.</li>
                  ) : (
                    departments.map(dept => (
                      <li key={dept.id} className="p-3 rounded-lg hover:bg-mint-bg group cursor-pointer transition-colors border border-transparent hover:border-primary/20">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-primary transition-colors">{dept.name}</span>
                          <span className="bg-surface-container text-slate-muted px-2 py-0.5 rounded text-[10px] font-semibold">{dept.staffCount} Staff</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {dept.headDoctor ? (
                            <>
                              <div className="w-6 h-6 rounded-full bg-surface-variant flex items-center justify-center text-[10px] font-bold text-slate-muted">
                                {dept.headDoctor.name.substring(0, 2).toUpperCase()}
                              </div>
                              <span className="font-label-sm text-label-sm text-slate-muted">Head: {dept.headDoctor.name}</span>
                            </>
                          ) : (
                            <span className="font-label-sm text-label-sm text-slate-muted">Head: N/A</span>
                          )}
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <div className="p-4 border-t border-outline-variant/10 text-center">
                <button 
                  className="text-secondary hover:text-secondary-container font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1 w-full"
                  onClick={() => alert("View all departments")}
                >
                  View All Departments <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* New Doctor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
          <div className="absolute inset-0 bg-slate-dark/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-xl shadow-[0px_10px_30px_rgba(30,41,59,0.1)] border border-outline-variant/30 w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Add New Doctor</h3>
              <button className="text-slate-muted hover:text-on-surface transition-colors p-1 rounded-full hover:bg-surface-container-low" onClick={() => setIsModalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 flex-1 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-label-md font-semibold text-on-surface">Full Name</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-surface-off-white border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-secondary" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Dr. Robert Chen"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md font-semibold text-on-surface">Email Address</label>
                <input 
                  type="email" 
                  className="w-full p-3 bg-surface-off-white border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-secondary" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="robert.chen@hospital.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md font-semibold text-on-surface">Specialization</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-surface-off-white border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-secondary" 
                  value={formData.specialization}
                  onChange={e => setFormData({...formData, specialization: e.target.value})}
                  placeholder="e.g. Cardiology"
                />
              </div>
            </div>
            <div className="p-6 border-t border-outline-variant/20 bg-surface-off-white flex justify-end gap-3 rounded-b-xl">
              <button className="px-5 py-2.5 rounded-lg font-label-md text-slate-muted hover:bg-surface-variant transition-colors" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button 
                className="bg-secondary text-white font-label-md px-6 py-2.5 rounded-lg shadow-sm hover:bg-secondary-container transition-colors"
                onClick={handleCreateDoctor}
              >
                Save Doctor
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
