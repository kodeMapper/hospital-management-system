package com.nt.Controller;

import com.nt.Repository.AppointmentRepository;
import com.nt.Repository.DepartmentRepository;
import com.nt.Repository.DoctorRepository;
import com.nt.Repository.PatientRepository;
import com.nt.dto.DashboardMetricsDTO;
import com.nt.dto.DTOConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final DepartmentRepository departmentRepository;
    private final AppointmentRepository appointmentRepository;

    @GetMapping("/metrics")
    public DashboardMetricsDTO getMetrics() {
        DashboardMetricsDTO dto = new DashboardMetricsDTO();
        dto.setTotalPatients(patientRepository.count());
        dto.setActiveDoctors(doctorRepository.count());
        dto.setTotalDepartments(departmentRepository.count());
        
        // Count today's appointments
        LocalDateTime startOfDay = LocalDateTime.now().toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = startOfDay.plusDays(1).minusNanos(1);
        long todayCount = appointmentRepository.findAll().stream()
            .filter(a -> a.getAppointmentTime().isAfter(startOfDay) && a.getAppointmentTime().isBefore(endOfDay))
            .count();
        dto.setTodayAppointments(todayCount);

        dto.setBloodGroupDistribution(patientRepository.countEachBloodGroupType());

        dto.setUpcomingAppointments(
            appointmentRepository.findAll(PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "appointmentTime")))
                .stream()
                .map(DTOConverter::convertAppointment)
                .collect(Collectors.toList())
        );

        return dto;
    }
}
