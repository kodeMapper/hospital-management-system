package com.nt.dto;

import java.util.List;
import lombok.Data;

@Data
public class DashboardMetricsDTO {
    private long totalPatients;
    private long activeDoctors;
    private long todayAppointments;
    private long totalDepartments;
    private List<BloodGroupCountResponseEntity> bloodGroupDistribution;
    private List<AppointmentDTO> upcomingAppointments;
}
