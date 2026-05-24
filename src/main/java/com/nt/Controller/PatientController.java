package com.nt.Controller;

import com.nt.Repository.PatientRepository;
import com.nt.dto.PatientDTO;
import com.nt.dto.DTOConverter;
import com.nt.entity.Patient;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientRepository patientRepository;

    @GetMapping
    public List<PatientDTO> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(DTOConverter::convertPatient)
                .collect(Collectors.toList());
    }

    @PostMapping
    public PatientDTO createPatient(@RequestBody Patient patient) {
        return DTOConverter.convertPatient(patientRepository.save(patient));
    }
}
