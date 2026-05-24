package com.nt.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nt.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}