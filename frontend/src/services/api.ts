const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const fetchDashboardMetrics = async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/metrics`);
    if (!response.ok) throw new Error('Failed to fetch metrics');
    return response.json();
};

export const fetchPatients = async () => {
    const response = await fetch(`${API_BASE_URL}/patients`);
    if (!response.ok) throw new Error('Failed to fetch patients');
    return response.json();
};

export const createPatient = async (patientData: any) => {
    const response = await fetch(`${API_BASE_URL}/patients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientData)
    });
    if (!response.ok) throw new Error('Failed to create patient');
    return response.json();
};

export const fetchDoctors = async () => {
    const response = await fetch(`${API_BASE_URL}/doctors`);
    if (!response.ok) throw new Error('Failed to fetch doctors');
    return response.json();
};

export const createDoctor = async (doctorData: any) => {
    const response = await fetch(`${API_BASE_URL}/doctors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doctorData)
    });
    if (!response.ok) throw new Error('Failed to create doctor');
    return response.json();
};

export const fetchDepartments = async () => {
    const response = await fetch(`${API_BASE_URL}/departments`);
    if (!response.ok) throw new Error('Failed to fetch departments');
    return response.json();
};

export const fetchAppointments = async () => {
    const response = await fetch(`${API_BASE_URL}/appointments`);
    if (!response.ok) throw new Error('Failed to fetch appointments');
    return response.json();
};

export const createAppointment = async (appointmentData: any) => {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData)
    });
    if (!response.ok) throw new Error('Failed to create appointment');
    return response.json();
};
