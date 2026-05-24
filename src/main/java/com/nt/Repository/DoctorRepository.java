package com.nt.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nt.entity.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long>{

}
