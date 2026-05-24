package com.nt.dto;

import lombok.Data;
import java.util.List;

@Data
public class DepartmentDTO {
    private Long id;
    private String name;
    private DoctorDTO headDoctor;
    private List<DoctorDTO> doctors;
    private int staffCount;
}
