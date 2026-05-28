package com.nt.Repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.nt.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    long countByAppointmentTimeGreaterThanEqualAndAppointmentTimeLessThan(LocalDateTime start, LocalDateTime end);

    @EntityGraph(attributePaths = {"patient", "doctor"})
    List<Appointment> findTop5ByOrderByAppointmentTimeDesc();

    @EntityGraph(attributePaths = {"patient", "doctor"})
    List<Appointment> findAllByOrderByAppointmentTimeDesc();
}
