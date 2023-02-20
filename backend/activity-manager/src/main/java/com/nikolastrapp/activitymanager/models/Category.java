package com.nikolastrapp.activitymanager.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "TB_CATEGORY")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Category implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, unique = true, length = 255)
    private String name;

    @Column(nullable = false, unique = true, length = 255)
    private String color;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Activity> activities = new ArrayList<>();

    public void update(Category other) {
        this.name = other.getName();
        this.color = other.getColor();
    }

}
