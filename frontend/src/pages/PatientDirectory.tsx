import { useEffect, useState } from 'react';
import { fetchPatients, createPatient } from '../services/api';

export default function PatientDirectory() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: 'Male',
    bloodGroup: 'A_POSITIVE',
    birthDate: ''
  });

  const loadData = () => {
    setLoading(true);
    fetchPatients()
      .then(data => {
        setPatients(data);
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

  const handleCreatePatient = async () => {
    if(!formData.name || !formData.email || !formData.birthDate) {
      alert("Please fill in required fields: Name, Email, Birth Date");
      return;
    }
    try {
      await createPatient(formData);
      setIsModalOpen(false);
      loadData(); // refresh list
    } catch (error) {
      console.error(error);
      alert("Failed to create patient");
    }
  };

  const filteredPatients = patients.filter(p => {
    const matchesSearch = (p.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                          (p.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                          (p.id?.toString() || '').includes(searchQuery);
    const matchesBg = bloodGroupFilter ? p.bloodGroup === bloodGroupFilter : true;
    return matchesSearch && matchesBg;
  });

  return (
    <>
      <main className="flex-1 p-4 md:p-8 max-w-[1440px] mx-auto w-full">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Patients</h2>
            <p className="font-body-md text-body-md text-slate-muted mt-1">Manage and view all registered patient records.</p>
          </div>
          <button 
            className="bg-secondary text-white px-6 py-2.5 rounded-lg font-label-md flex items-center gap-2 hover:bg-secondary-container shadow-sm transition-all active:scale-95 whitespace-nowrap"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="material-symbols-outlined">person_add</span>
            New Patient
          </button>
        </div>
        
        {/* Filters & Controls Bar */}
        <div className="bg-white rounded-xl p-4 card-shadow mb-4 flex flex-col md:flex-row gap-4 justify-between items-center border border-outline-variant/10">
          <div className="w-full md:w-96 flex items-center bg-surface-off-white border border-slate-200 rounded-lg px-4 py-2 focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/10 transition-all">
            <span className="material-symbols-outlined text-slate-muted mr-2">search</span>
            <input 
              className="bg-transparent border-none focus:ring-0 w-full font-label-md text-label-md p-0 placeholder:text-slate-muted outline-none" 
              placeholder="Search by ID, Name, or Email..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full md:w-auto flex items-center gap-3">
            <div className="relative w-full md:w-48">
              <select 
                className="w-full appearance-none bg-surface-off-white border border-slate-200 text-on-surface py-2 pl-4 pr-10 rounded-lg font-label-md focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all cursor-pointer outline-none"
                value={bloodGroupFilter}
                onChange={(e) => setBloodGroupFilter(e.target.value)}
              >
                <option value="">All Blood Groups</option>
                <option value="A_POSITIVE">A+</option>
                <option value="A_NEGATIVE">A-</option>
                <option value="B_POSITIVE">B+</option>
                <option value="B_NEGATIVE">B-</option>
                <option value="O_POSITIVE">O+</option>
                <option value="O_NEGATIVE">O-</option>
                <option value="AB_POSITIVE">AB+</option>
                <option value="AB_NEGATIVE">AB-</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-muted pointer-events-none">arrow_drop_down</span>
            </div>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-muted hover:bg-surface-off-white transition-colors" title="Filter Options">
              <span className="material-symbols-outlined">tune</span>
            </button>
          </div>
        </div>

        {/* Data Table Card */}
        <div className="bg-white rounded-xl card-shadow border border-outline-variant/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface-off-white">
                  <th className="py-4 px-6 font-label-sm text-label-sm text-slate-muted uppercase tracking-wider">Patient ID</th>
                  <th className="py-4 px-6 font-label-sm text-label-sm text-slate-muted uppercase tracking-wider">Name</th>
                  <th className="py-4 px-6 font-label-sm text-label-sm text-slate-muted uppercase tracking-wider">Email</th>
                  <th className="py-4 px-6 font-label-sm text-label-sm text-slate-muted uppercase tracking-wider">Gender</th>
                  <th className="py-4 px-6 font-label-sm text-label-sm text-slate-muted uppercase tracking-wider">Blood Group</th>
                  <th className="py-4 px-6 font-label-sm text-label-sm text-slate-muted uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-body-md text-on-surface divide-y divide-outline-variant/10">
                {loading ? (
                  <tr><td colSpan={6} className="py-4 px-6 text-center text-slate-muted">Loading patients...</td></tr>
                ) : filteredPatients.length === 0 ? (
                  <tr><td colSpan={6} className="py-4 px-6 text-center text-slate-muted">No patients found.</td></tr>
                ) : (
                  filteredPatients.map(patient => (
                    <tr key={patient.id} className="hover:bg-mint-bg transition-colors group">
                      <td className="py-4 px-6 font-label-md text-slate-muted">#PT-{patient.id.toString().padStart(3, '0')}</td>
                      <td className="py-4 px-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary font-bold text-xs">
                          {patient.name.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="font-medium">{patient.name}</span>
                      </td>
                      <td className="py-4 px-6 text-slate-muted">{patient.email}</td>
                      <td className="py-4 px-6">{patient.gender}</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center justify-center px-2 py-1 rounded-md bg-secondary/10 text-secondary font-label-sm text-label-sm">
                          {patient.bloodGroup ? patient.bloodGroup.replace('_POSITIVE', '+').replace('_NEGATIVE', '-') : 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2 transition-opacity">
                          <button 
                            className="p-1.5 text-secondary hover:bg-secondary-fixed rounded-md transition-colors" 
                            title="View"
                            onClick={() => alert(`View patient ${patient.name}`)}
                          >
                            <span className="material-symbols-outlined text-xl">visibility</span>
                          </button>
                          <button 
                            className="p-1.5 text-slate-muted hover:text-secondary hover:bg-surface-container-high rounded-md transition-colors" 
                            title="Edit"
                            onClick={() => alert(`Edit patient ${patient.name}`)}
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
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-off-white">
            <p className="font-label-sm text-label-sm text-slate-muted">Showing {filteredPatients.length} entries</p>
          </div>
        </div>
      </main>

      {/* New Patient Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
          <div className="absolute inset-0 bg-slate-dark/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-xl shadow-[0px_10px_30px_rgba(30,41,59,0.1)] border border-outline-variant/30 w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Add New Patient</h3>
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
                  placeholder="e.g. Jane Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md font-semibold text-on-surface">Email Address</label>
                <input 
                  type="email" 
                  className="w-full p-3 bg-surface-off-white border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-secondary" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="jane.doe@example.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md font-semibold text-on-surface">Date of Birth</label>
                <input 
                  type="date" 
                  className="w-full p-3 bg-surface-off-white border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-secondary" 
                  value={formData.birthDate}
                  onChange={e => setFormData({...formData, birthDate: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md font-semibold text-on-surface">Gender</label>
                  <select 
                    className="w-full p-3 bg-surface-off-white border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-secondary"
                    value={formData.gender}
                    onChange={e => setFormData({...formData, gender: e.target.value})}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md font-semibold text-on-surface">Blood Group</label>
                  <select 
                    className="w-full p-3 bg-surface-off-white border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-secondary"
                    value={formData.bloodGroup}
                    onChange={e => setFormData({...formData, bloodGroup: e.target.value})}
                  >
                    <option value="A_POSITIVE">A+</option>
                    <option value="A_NEGATIVE">A-</option>
                    <option value="B_POSITIVE">B+</option>
                    <option value="B_NEGATIVE">B-</option>
                    <option value="O_POSITIVE">O+</option>
                    <option value="O_NEGATIVE">O-</option>
                    <option value="AB_POSITIVE">AB+</option>
                    <option value="AB_NEGATIVE">AB-</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-outline-variant/20 bg-surface-off-white flex justify-end gap-3 rounded-b-xl">
              <button className="px-5 py-2.5 rounded-lg font-label-md text-slate-muted hover:bg-surface-variant transition-colors" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button 
                className="bg-secondary text-white font-label-md px-6 py-2.5 rounded-lg shadow-sm hover:bg-secondary-container transition-colors"
                onClick={handleCreatePatient}
              >
                Save Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
