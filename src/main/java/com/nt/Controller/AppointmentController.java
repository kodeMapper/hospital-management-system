package com.nt.Controller;

import com.nt.Repository.AppointmentRepository;
import com.nt.Service.AppointmentService;
import com.nt.dto.AppointmentDTO;
import com.nt.dto.DTOConverter;
import com.nt.entity.Appointment;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;
    private final AppointmentService appointmentService;

    @GetMapping
    public List<AppointmentDTO> getAllAppointments() {
        return appointmentRepository.findAllByOrderByAppointmentTimeDesc().stream()
                .map(DTOConverter::convertAppointment)
                .collect(Collectors.toList());
    }

    @PostMapping
    public AppointmentDTO createAppointment(@RequestBody AppointmentRequest request) {
        Appointment app = new Appointment();
        app.setAppointmentTime(request.getAppointmentTime());
        app.setReason(request.getReason());
        Appointment saved = appointmentService.createNewAppointment(app, request.getDoctorId(), request.getPatientId());
        return DTOConverter.convertAppointment(saved);
    }
}

@lombok.Data
class AppointmentRequest {
    private java.time.LocalDateTime appointmentTime;
    private String reason;
    private Long patientId;
    private Long doctorId;
}
