package com.nikolastrapp.activitymanager.dtos;

import com.nikolastrapp.activitymanager.enums.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ActivityDto {

    @NotBlank
    private String title;
    @NotBlank
    private String description;
    @NotNull
    private LocalDateTime startDate;
    @NotNull
    private LocalDateTime endDate;
    @NotNull
    private Category category;

}
