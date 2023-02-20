package com.nikolastrapp.activitymanager.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TB_ACTIVITY")
@Entity
public class Activity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false, unique = false, length = 255)
    private String title;
    @Column(nullable = true, unique = false, length = 255)
    private String description;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Brazil/East")
    @Column(nullable = false)
    private LocalDateTime startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Brazil/East")
    @Column(nullable = false)
    private LocalDateTime endDate;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    public void update(Activity other) {
        this.title = other.getTitle();
        this.description = other.getDescription();
        this.startDate = other.getStartDate();
        this.endDate = other.getEndDate();
        this.category = other.getCategory();
    }

}
