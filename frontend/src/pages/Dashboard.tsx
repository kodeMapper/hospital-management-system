import { useEffect, useState } from 'react';
import { fetchDashboardMetrics } from '../services/api';

export default function Dashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardMetrics()
      .then(data => {
        setMetrics(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-muted">Loading dashboard...</div>;
  }

  if (!metrics) {
    return <div className="p-8 text-center text-error">Failed to load dashboard metrics.</div>;
  }

  // Calculate Blood Group Distribution Percentages
  const totalWithBg = metrics.bloodGroupDistribution.reduce((acc: number, curr: any) => acc + curr.count, 0);
  let accumulatedAngle = 0;
  const gradientStops = metrics.bloodGroupDistribution.map((bg: any, index: number) => {
    const percentage = totalWithBg === 0 ? 0 : (bg.count / totalWithBg) * 100;
    const colors = ["#006c49", "#004ac6", "#F59E0B", "#943700", "#6cf8bb", "#bc4800", "#2e3039", "#dbe1ff"];
    const color = colors[index % colors.length];
    const stop = `${color} ${accumulatedAngle}% ${accumulatedAngle + percentage}%`;
    accumulatedAngle += percentage;
    return stop;
  }).join(", ");

  const conicGradient = totalWithBg > 0 ? `conic-gradient(${gradientStops})` : 'conic-gradient(#e7e7f3 0% 100%)';

  return (
    <main className="flex-1 p-4 md:p-8 w-full max-w-[1440px] mx-auto">
      <div className="mb-8">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">Overview</h2>
        <p className="text-slate-muted font-body-md text-body-md">Today's hospital metrics at a glance.</p>
      </div>
      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Patients */}
        <div className="bg-white rounded-xl p-4 card-shadow border border-surface-variant relative overflow-hidden group hover:border-secondary/30 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-label-sm text-label-sm text-slate-muted uppercase tracking-wider mb-1">Total Patients</p>
              <h3 className="font-headline-md text-headline-md text-on-surface">{metrics.totalPatients}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">group</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-fixed to-secondary opacity-50"></div>
        </div>
        {/* Active Doctors */}
        <div className="bg-white rounded-xl p-4 card-shadow border border-surface-variant relative overflow-hidden group hover:border-primary/30 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-label-sm text-label-sm text-slate-muted uppercase tracking-wider mb-1">Active Doctors</p>
              <h3 className="font-headline-md text-headline-md text-on-surface">{metrics.activeDoctors}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">stethoscope</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-fixed to-primary opacity-50"></div>
        </div>
        {/* Today's Appointments */}
        <div className="bg-white rounded-xl p-4 card-shadow border border-surface-variant relative overflow-hidden group hover:border-warning-orange/30 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-label-sm text-label-sm text-slate-muted uppercase tracking-wider mb-1">Today's Appts</p>
              <h3 className="font-headline-md text-headline-md text-on-surface">{metrics.todayAppointments}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-warning-orange/10 flex items-center justify-center text-warning-orange">
              <span className="material-symbols-outlined">calendar_today</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-warning-orange/20 to-warning-orange opacity-50"></div>
        </div>
        {/* Departments */}
        <div className="bg-white rounded-xl p-4 card-shadow border border-surface-variant relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-label-sm text-label-sm text-slate-muted uppercase tracking-wider mb-1">Departments</p>
              <h3 className="font-headline-md text-headline-md text-on-surface">{metrics.totalDepartments}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined">domain</span>
            </div>
          </div>
        </div>
      </div>
      {/* Content Split: Table & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upcoming Appointments List */}
        <div className="lg:col-span-8 bg-white rounded-xl card-shadow border border-surface-variant flex flex-col h-[500px]">
          <div className="p-6 border-b border-surface-variant flex justify-between items-center">
            <h3 className="font-headline-md text-headline-md text-on-surface">Upcoming Appointments</h3>
            <button className="text-secondary font-label-md text-label-md hover:underline">View All</button>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-surface-off-white z-10">
                <tr>
                  <th className="py-3 px-6 font-label-sm text-label-sm text-slate-muted font-semibold border-b border-surface-variant">Time</th>
                  <th className="py-3 px-6 font-label-sm text-label-sm text-slate-muted font-semibold border-b border-surface-variant">Patient Name</th>
                  <th className="py-3 px-6 font-label-sm text-label-sm text-slate-muted font-semibold border-b border-surface-variant">Doctor</th>
                  <th className="py-3 px-6 font-label-sm text-label-sm text-slate-muted font-semibold border-b border-surface-variant text-right">Action</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-body-md">
                {metrics.upcomingAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-4 px-6 text-center text-slate-muted">No upcoming appointments.</td>
                  </tr>
                ) : (
                  metrics.upcomingAppointments.map((appt: any) => (
                    <tr key={appt.id} className="hover:bg-primary-fixed/50 transition-colors border-b border-surface-variant/50">
                      <td className="py-4 px-6 text-on-surface-variant font-medium">
                        {new Date(appt.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary font-bold text-xs">
                            {appt.patient.name.substring(0, 2).toUpperCase()}
                          </div>
                          <span className="text-on-surface font-medium">{appt.patient.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-muted">{appt.doctor.name}</td>
                      <td className="py-4 px-6 text-right">
                        <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm ${appt.status === 'Confirmed' ? 'bg-primary/10 text-primary' : 'bg-warning-orange/10 text-warning-orange'}`}>
                          {appt.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Donut Chart Section */}
        <div className="lg:col-span-4 bg-white rounded-xl card-shadow border border-surface-variant p-6 h-[500px] flex flex-col">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Patients by Blood Group</h3>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <div className="w-48 h-48 rounded-full relative flex items-center justify-center" style={{ background: conicGradient }}>
              <div className="w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                <span className="font-headline-lg text-headline-lg font-bold text-on-surface">{metrics.totalPatients}</span>
                <span className="font-label-sm text-label-sm text-slate-muted">Total</span>
              </div>
            </div>
            {/* Legend */}
            <div className="w-full mt-8 grid grid-cols-2 gap-4 max-h-[120px] overflow-auto">
              {metrics.bloodGroupDistribution.map((bg: any, index: number) => {
                const colors = ["bg-[#006c49]", "bg-[#004ac6]", "bg-[#F59E0B]", "bg-[#943700]", "bg-[#6cf8bb]", "bg-[#bc4800]", "bg-[#2e3039]", "bg-[#dbe1ff]"];
                const colorClass = colors[index % colors.length];
                return (
                  <div key={bg.bloodGroupType} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${colorClass}`}></div>
                    <span className="font-label-sm text-label-sm text-slate-muted">{bg.bloodGroupType} ({bg.count})</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
