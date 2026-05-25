import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Layout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return isActive
      ? "flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-semibold border-r-4 border-primary transition-colors cursor-pointer active:scale-95"
      : "flex items-center gap-3 px-4 py-3 rounded-lg text-slate-muted hover:text-secondary hover:bg-surface-container-low transition-colors duration-200 cursor-pointer active:scale-95";
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex min-h-screen overflow-x-hidden font-body-md text-body-md relative">

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-dark/50 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* SideNavBar */}
      <aside className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:sticky left-0 top-0 h-screen w-[260px] bg-surface/95 backdrop-blur-md shadow-sm border-r border-outline-variant/30 py-stack-lg z-50 flex flex-col`}>
        <div className="px-6 mb-8 mt-6 flex justify-between items-center">
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-secondary">Chhota Bheem Hospital</h1>
            <p className="font-label-sm text-label-sm text-slate-muted mt-1">Hospital Administrator</p>
          </div>
          <button className="md:hidden text-slate-muted hover:text-secondary" onClick={closeMenu}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="px-4 mb-6">
          <Link
            to="/appointments"
            className="w-full bg-secondary text-white py-3 rounded-lg font-label-md text-label-md flex justify-center items-center gap-2 hover:bg-secondary-container transition-colors shadow-sm"
            onClick={closeMenu}
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            New Admission
          </Link>
        </div>
        <nav className="flex-1 flex flex-col gap-2 px-4 overflow-y-auto">
          <Link to="/" className={getLinkClass('/')} onClick={closeMenu}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
            Dashboard
          </Link>
          <Link to="/patients" className={getLinkClass('/patients')} onClick={closeMenu}>
            <span className="material-symbols-outlined">person</span>
            Patients
          </Link>
          <Link to="/doctors" className={getLinkClass('/doctors')} onClick={closeMenu}>
            <span className="material-symbols-outlined">medical_services</span>
            Doctors
          </Link>
          <Link to="/appointments" className={getLinkClass('/appointments')} onClick={closeMenu}>
            <span className="material-symbols-outlined">event</span>
            Appointments
          </Link>
          <Link to="/departments" className={getLinkClass('/departments')} onClick={closeMenu}>
            <span className="material-symbols-outlined">account_tree</span>
            Departments
          </Link>
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-muted hover:text-secondary hover:bg-surface-container-low transition-colors duration-200 cursor-pointer active:scale-95" onClick={closeMenu}>
            <span className="material-symbols-outlined">settings</span>
            Settings
          </a>
        </nav>
        <div className="mt-auto px-6 flex items-center gap-3 pt-4 border-t border-outline-variant/20">
          <img alt="Admin Profile Picture" className="w-10 h-10 rounded-full object-cover border border-outline-variant/30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAiM8D6PLgAs8wqc6dkjrwSss8BAfOCxCpouXaeXUiNdHFJZfv5UvL6H9jNamXvu5G5mfXOf8H7v7sq03CPg2d08WokyKPjHHiEFWySs5eg25WXKKfxOvEM3e11gdxHqNq1OJI6xb9ufDKVsjf3SoyWCCb35JqtBfQA_pLKDGJ1E0WX4tDvpdcqiBTYkstEaDsSdDBBqyzOncfwgkpXZNT-x6bbggYbTY4lwVOCxD_4UANVJvgynWxNugh4alsEKz3euW-wyhDWic" />
          <div>
            <p className="font-label-md text-label-md font-semibold text-on-surface">Admin</p>
            <p className="font-label-sm text-label-sm text-slate-muted">View Profile</p>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-h-screen md:w-[calc(100%-260px)] w-full">
        {/* TopNavBar */}
        <header className="h-16 w-full sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-sm border-b border-outline-variant/20 flex justify-between items-center px-4 md:px-8 transition-all duration-300 ease-in-out">
          <div className="flex items-center gap-4 md:hidden">
            <button
              className="p-2 text-secondary hover:bg-surface-container-high rounded-full focus:outline-none"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h1 className="font-headline-md text-headline-md font-black text-secondary">Chhota Bheem</h1>
          </div>
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-muted">search</span>
              <input className="w-full pl-10 pr-4 py-2 rounded-full border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/20 bg-surface-off-white outline-none font-label-md text-label-md transition-all" placeholder="Search patients, doctors..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-on-surface-variant hover:bg-surface-container-high rounded-full p-2 transition-all duration-300 relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-critical-red rounded-full"></span>
            </button>
            <button className="text-on-surface-variant hover:bg-surface-container-high rounded-full p-2 transition-all duration-300 hidden md:block">
              <span className="material-symbols-outlined">help_outline</span>
            </button>
            <img alt="Administrator Avatar" className="w-8 h-8 rounded-full object-cover ml-2 md:hidden" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEEr1fZOqn6SDpX21OJs3AnOcDYopV9XMgD5sjoVrV5z1Fcm9QHpg9IXgSJq-Af5sOM-ok8L78tdiccpLIExspDExUIavDQ01euB7dI9noJIGETI8yS0yLqVMn63rWSo4bpC7PJATy-DgghK4pQvY-Tky5FM9EV1qeei1VEHvyYleJrEZ53pRTeX6sJCxf_sNvyu5gDsPKZUofHjkItu-KWr5aEJBfLueiujQwz9aFwKwTZYebYW-UG95FUBTevYeD0d-Ua91ATlI" />
          </div>
        </header>

        {/* Main Route Content */}
        <Outlet />

        {/* Footer */}
        <footer className="w-full py-4 bg-surface-off-white border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center px-4 md:px-8 max-w-[1440px] mx-auto mt-auto">
          <p className="font-label-md text-label-md font-semibold text-slate-dark text-center md:text-left">© 2024 Chhota Bheem Hospital. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0 font-label-sm text-label-sm">
            <a className="text-slate-muted hover:text-secondary transition-colors" href="#">Privacy Policy</a>
            <a className="text-slate-muted hover:text-secondary transition-colors" href="#">Support</a>
            <a className="text-slate-muted hover:text-secondary transition-colors" href="#">Terms of Service</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
