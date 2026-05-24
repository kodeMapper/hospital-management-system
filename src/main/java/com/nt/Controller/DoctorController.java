package com.nt.Controller;

import com.nt.Repository.DoctorRepository;
import com.nt.dto.DoctorDTO;
import com.nt.dto.DTOConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorRepository doctorRepository;

    @GetMapping
    public List<DoctorDTO> getAllDoctors() {
        return doctorRepository.findAll().stream()
                .map(DTOConverter::convertDoctor)
                .collect(Collectors.toList());
    }

    @org.springframework.web.bind.annotation.PostMapping
    public DoctorDTO createDoctor(@org.springframework.web.bind.annotation.RequestBody com.nt.entity.Doctor doctor) {
        return DTOConverter.convertDoctor(doctorRepository.save(doctor));
    }
}
