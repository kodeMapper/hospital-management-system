package com.nt.dto;

import com.nt.entity.*;
import java.util.stream.Collectors;

public class DTOConverter {

    public static PatientDTO convertPatient(Patient patient) {
        if (patient == null) return null;
        PatientDTO dto = new PatientDTO();
        dto.setId(patient.getId());
        dto.setName(patient.getName());
        dto.setBirthDate(patient.getBirthDate());
        dto.setEmail(patient.getEmail());
        dto.setGender(patient.getGender());
        dto.setBloodGroup(patient.getBloodGroup());
        return dto;
    }

    public static DoctorDTO convertDoctor(Doctor doctor) {
        if (doctor == null) return null;
        DoctorDTO dto = new DoctorDTO();
        dto.setId(doctor.getId());
        dto.setName(doctor.getName());
        dto.setSpecialization(doctor.getSpecialization());
        dto.setEmail(doctor.getEmail());
        return dto;
    }

    public static AppointmentDTO convertAppointment(Appointment appointment) {
        if (appointment == null) return null;
        AppointmentDTO dto = new AppointmentDTO();
        dto.setId(appointment.getId());
        dto.setAppointmentTime(appointment.getAppointmentTime());
        dto.setReason(appointment.getReason());
        dto.setPatient(convertPatient(appointment.getPatient()));
        dto.setDoctor(convertDoctor(appointment.getDoctor()));
        // Simplistic status logic for UI
        if(appointment.getAppointmentTime().isBefore(java.time.LocalDateTime.now())) {
             dto.setStatus("Confirmed");
        } else {
             dto.setStatus("Pending");
        }
        return dto;
    }

    public static DepartmentDTO convertDepartment(Department department) {
        if (department == null) return null;
        DepartmentDTO dto = new DepartmentDTO();
        dto.setId(department.getId());
        dto.setName(department.getName());
        dto.setHeadDoctor(convertDoctor(department.getHeadDoctor()));
        if (department.getDoctors() != null) {
            dto.setDoctors(department.getDoctors().stream().map(DTOConverter::convertDoctor).collect(Collectors.toList()));
            dto.setStaffCount(department.getDoctors().size());
        } else {
            dto.setStaffCount(0);
        }
        return dto;
    }
}
