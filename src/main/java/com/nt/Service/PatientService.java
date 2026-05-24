package com.nt.Service;

import com.nt.Repository.PatientRepository;
import com.nt.entity.Patient;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

//    private final EntityManager entityManager;

    @Transactional
    public Patient getPatientById(Long id) {

        Patient p1 = patientRepository.findById(id).orElseThrow();

        Patient p2 = patientRepository.findById(id).orElseThrow();

        System.out.println(p1 == p2);

        p1.setName("Yoyo");

//        patientRepository.save(p1);

        return p1;
    }

}