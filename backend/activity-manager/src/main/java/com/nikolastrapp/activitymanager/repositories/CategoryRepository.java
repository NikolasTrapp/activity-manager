package com.nikolastrapp.activitymanager.repositories;

import com.nikolastrapp.activitymanager.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
